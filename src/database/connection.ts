import { Connection, createConnection } from "typeorm";

let _connection: Connection;

export const initConnection = async (): Promise<void> => {
  _connection = await createConnection();
};

export const getConnection = async (): Promise<Connection> => {
  if (_connection) return _connection;
  else return await createConnection();
};
