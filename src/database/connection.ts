import {
  Connection,
  ConnectionOptions,
  createConnection,
  ObjectType,
  Repository
} from "typeorm";

let _connection: Connection;

export const initConnection = async (): Promise<Connection> => {
  const isTest = process.env.NODE_ENV === "test";

  const host = process.env.DB_HOST || "localhost";
  const port = Number(process.env.DB_PORT) || 3306;
  const database = process.env.DATABASE_NAME || "shop";
  const username = process.env.DATABASE_USER || "shop";
  const password = process.env.DATABASE_PASSWORD || "secret";
  const dropSchema = isTest;
  const logging: "all" | ("migration" | "schema" | "error")[] = isTest
    ? "all"
    : ["migration", "schema", "error"];
  const migrationsRun = !isTest;

  // TODO: For test instead of running migration use connection.synchronize()
  const config: ConnectionOptions = {
    type: "mariadb",

    host,
    port,

    database,
    username,
    password,

    dropSchema,
    migrationsRun,
    migrations: [`${__dirname}/migrations/*.ts`],

    entities: [`${__dirname}/models/*.ts`],

    logger: "advanced-console",
    logging: false
  };

  _connection = await createConnection(config);

  if (isTest) {
    await _connection.synchronize();
  }

  return _connection;
};

export const getConnection = async (): Promise<Connection> => {
  if (!_connection) await initConnection();
  return _connection;
};

export const getRepository = async <T>(
  entity: ObjectType<T>
): Promise<Repository<T>> => {
  const connection: Connection = await getConnection();
  const repo: Repository<T> = await connection.getRepository(entity);

  return repo;
};

export const reloadEntities = async (): Promise<void> => {
  const connection: Connection = await getConnection();
  const entities = connection.entityMetadatas;
  for (let i in entities) {
    try {
      const entity = entities[i];
      const repository = await connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    } catch (error) {
      console.log(new Error(`ERROR: Cleaning test db: ${error}`));
    }
  }
};
