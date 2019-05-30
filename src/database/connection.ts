import {
  Connection,
  ConnectionOptions,
  createConnection,
  ObjectType,
  Repository
} from "typeorm";

import Category from "./models/category";
import Department from "./models/department";

let _connection: Connection;

const config: ConnectionOptions = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "dbuser",
  password: "secret",
  database: "main",
  entities: [Department, Category]
};

export const initConnection = async (): Promise<void> => {
  _connection = await createConnection(config);
};

// TODO: Check the case when database goes down
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
