type Sig = "SIGINT" | "SIGTERM" | "SIGHUP";

const termSignals: Sig[] = ["SIGINT", "SIGTERM", "SIGHUP"];

interface Server {
  stop: Function;
}

const graceful = (server: Server): void => {
  termSignals.forEach(
    (sig: Sig): void => {
      process.on(
        sig,

        (): void => {
          console.log(`\nGracefully shutting down server after ${sig}...`);
          server.stop();
          process.exit(0);
        }
      );
    }
  );
};

export default graceful;
