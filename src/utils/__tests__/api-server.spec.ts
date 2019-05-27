import tcpPortUsed from "tcp-port-used";

import http from "http";

import ApiServer from "../api-server";

const host = "localhost";
const port = 4000;

const url = `http://${host}:${port}`;

test.only("Check server start/stop", async (done): Promise<void> => {
  const server: ApiServer<http.Server> = new ApiServer(http.createServer);

  server.config();
  server.config(port);
  server.config(port, host);

  server.initRoutes([(): void => {}]);

  expect(server.status()).toEqual("Server is stopped");

  await server.start();
  expect(server.status()).toEqual(`Server listening to ${url}`);
  expect(await tcpPortUsed.check(port, host)).toBe(true);

  await server.stop();
  expect(server.status()).toEqual("Server is stopped");
  await server.stop();

  done();
});
