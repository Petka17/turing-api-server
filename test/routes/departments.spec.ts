import request from "supertest";

import createServer from "../../src/server";

const server = createServer();

test("Get department list", async (done): Promise<void> => {
  const response = await request(server.getApp()).get("/departments");

  expect([response.status, response.body]).toEqual([200, []]);

  done();
});
