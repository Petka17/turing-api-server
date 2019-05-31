import { initConnection } from "./database/connection";
import createServer from "./server";
import graceful from "./utils/graceful";

const server = createServer();

/**
 * Setup graceful stop
 */

const main = async (): Promise<string> => {
  const dbConnect = await initConnection();

  graceful({
    stop(): void {
      dbConnect.close();
      server.stop();
    }
  });

  return await server.start();
};

main()
  .then(console.info)
  .catch(console.error);
