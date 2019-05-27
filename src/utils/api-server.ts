import http from "http";

/**
 * HTTP Server wrapper
 * @description This realization is framework agnostic.
 */
class ApiServer<T> {
  private host: string;
  private port: number;

  private app: T;
  private server: http.Server;

  /**
   * Create new server
   * @param appInit application with routes
   * @param port a port to listen to
   * @param host a hostname to listen to
   */
  public constructor(
    appInit: () => T,
    port: number = 3000,
    host: string = "localhost"
  ) {
    this.port = port;
    this.host = host;

    this.app = appInit();
    this.server = http.createServer(this.app);
  }

  /**
   * Server status info
   */
  public status(): string {
    if (this.isListening()) {
      return `Server listening to http://${this.host}:${this.port}`;
    }
    return "Server is stopped";
  }

  /**
   * Config base connection params
   * @param port
   * @param host
   */
  public config(port?: number, host?: string): void {
    if (typeof port === "number") this.port = port;
    if (typeof host === "string") this.host = host;
  }

  /**
   * Init Routes
   * @param controllers an array of functions that take an application and setup §routes on it
   */
  public initRoutes(controllers: Function[]): void {
    controllers.forEach(
      (controller: Function): void => {
        controller(this.app);
      }
    );
  }

  /**
   * Start HTTP Server
   */
  public start(): Promise<string> {
    return new Promise(
      (resolve, reject): void => {
        this.server.on("error", reject);
        this.server.on(
          "listening",
          (): void => {
            resolve(this.status());
          }
        );

        this.server.listen(this.port, this.host);
      }
    );
  }

  /**
   * Stop HTTP Server
   * @description before stop check if the server is running
   */
  public stop(): Promise<void> {
    return new Promise<void>(
      (resolve): void => {
        if (this.isListening())
          this.server.close(
            (): void => {
              resolve();
            }
          );
        else resolve();
      }
    );
  }

  /**
   * Check if server is running
   */
  private isListening(): boolean {
    return this.server.listening;
  }
}

export default ApiServer;
