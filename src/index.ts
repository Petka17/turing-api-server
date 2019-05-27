import express from "express";
import ApiServer from "./utils/api-server";
import controllers from "./controllers";

const apiServer: ApiServer<express.Express> = new ApiServer(express);

apiServer.initRoutes(controllers);

/* istanbul ignore next */
if (require.main === module) {
  /**
   * Run this code only if the file is launched directly from command-line
   */
  const main = async (): Promise<string> => {
    await apiServer.start();

    const graceful = async (): Promise<void> => {
      console.info("\nStopping...");
      await apiServer.stop();
      console.info("Done");
      process.exit(0);
    };

    // Stop graceful
    process.on("SIGTERM", graceful);
    process.on("SIGINT", graceful);

    return apiServer.status();
  };

  main()
    .then(console.info)
    .catch(console.error);
}

export default apiServer;
