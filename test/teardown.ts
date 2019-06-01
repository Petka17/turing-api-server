import { getConnection } from "../src/database/connection";

export default async (): Promise<void> => {
  console.log("teardown");
  const connect = await getConnection();
  await connect.close();
  console.log("Done");
};
