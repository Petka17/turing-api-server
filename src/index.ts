import express from "express";
import ApiServer from "./utils/api-server";
import controllers from "./controllers";

const server: ApiServer<express.Express> = new ApiServer(express);

server.initRoutes(controllers);

/* istanbul ignore next */
if (require.main === module) {
  /**
   * Run this code only if the file is launched directly from command-line
   */
  const main = async (): Promise<string> => {
    await server.start();

    return server.status();
  };

  main()
    .then(console.info)
    .catch(console.error);
}

export default server;
