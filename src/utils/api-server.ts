import http from "http";

/**
 * HTTP Server wrapper
 * @description This realization is framework agnostic.
 */
class ApiServer<T> {
  private port: number;

  private app: T;
  private server: http.Server;

  /**
   * Create new server
   * @param app application with routes
   * @param port a port to listen to
   */
  public constructor(app: T, port: number) {
    this.port = port;
    this.app = app;
    this.server = http.createServer(this.app);
  }

  /**
   * Server status info
   */
  public status(): string {
    if (this.isListening()) {
      return `Server listening to http://localhost:${this.port}`;
    }
    return "Server is stopped";
  }

  /**
   * Change port
   * @param port
   */
  public configPort(port: number): void {
    this.port = port;
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

        this.server.listen(this.port);
      }
    );
  }

  /**
   * Stop HTTP Server
   * @description before stop check if the server is running
   */
  public stop(): void {
    // TODO: Add check for error during the close phase
    if (this.isListening()) this.server.close();
  }

  /**
   * Return app. Use in tests
   */
  public getApp(): T {
    return this.app;
  }

  /**
   * Check if server is running
   */
  private isListening(): boolean {
    return this.server.listening;
  }
}

export default ApiServer;
