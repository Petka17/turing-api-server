import request from "supertest";

import createServer from "../../src/server";

const server = createServer();

test("Get department list", async (done): Promise<void> => {
  const response = await request(server.getApp()).get("/departments");

  expect([response.status, response.body]).toEqual([
    200,
    [
      {
        department_id: 1,
        description: "sdfsdgsdg",
        name: "Test"
      },
      {
        department_id: 2,
        description: "sdfsdgsdg",
        name: "Test1"
      },
      {
        department_id: 4,
        description: "sdfsdgsdg",
        name: "Test3"
      }
    ]
  ]);

  done();
});
