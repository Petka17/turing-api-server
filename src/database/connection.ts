import {
  Connection,
  ConnectionOptions,
  createConnection,
  ObjectType,
  Repository
} from "typeorm";

let _connection: Connection;

export const initConnection = async (): Promise<Connection> => {
  const host = process.env.DB_HOST || "localhost";
  const port = Number(process.env.DB_PORT) || 3306;
  const database = process.env.DATABASE_NAME || "shop";
  const username = process.env.DATABASE_USER || "shop";
  const password = process.env.DATABASE_PASSWORD || "secret";
  const dropSchema = process.env.NODE_ENV === "test";
  const logging: "all" | ("migration" | "schema" | "error")[] =
    process.env.NODE_ENV === "test" ? "all" : ["migration", "schema", "error"];

  const config: ConnectionOptions = {
    type: "mariadb",

    host,
    port,

    database,
    username,
    password,

    dropSchema,
    migrationsRun: true,
    migrations: [`${__dirname}/migrations/*.ts`],

    entities: [`${__dirname}/models/*.ts`],

    logger: "advanced-console",
    logging
  };

  _connection = await createConnection(config);

  return _connection;
};

export const getConnection = async (): Promise<Connection> => {
  if (!_connection) await initConnection();
  return _connection;
};

export const getRepository = async <T>(
  entity: ObjectType<T>
): Promise<Repository<T>> => {
  const connect = await getConnection();
  const repo: Repository<T> = await connect.getRepository(entity);

  return repo;
};
