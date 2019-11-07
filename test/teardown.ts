import { getConnection } from "../src/database/connection";

export default async (): Promise<void> => {
  const connect = await getConnection();
  console.log("Closing db connection");
  await connect.close();
};
