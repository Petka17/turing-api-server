import { initConnection } from "./database/connection";
import createServer from "./server";
import graceful from "./utils/graceful";

const server = createServer();

/**
 * Setup graceful stop
 */
graceful(server);

const main = async (): Promise<string> => {
  await initConnection();
  return await server.start();
};

main()
  .then(console.info)
  .catch(console.error);
