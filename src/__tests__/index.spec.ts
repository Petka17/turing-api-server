import axios from "axios";

import server from "..";

const port = 4000;

const url = `http://localhost:${port}`;

beforeAll(
  async (done): Promise<void> => {
    server.configPort(port);
    await server.start();
    done();
  }
);

afterAll(
  async (done): Promise<void> => {
    await server.stop();
    done();
  }
);

test("hello route", async (done): Promise<void> => {
  const response = await axios.get(`${url}/hello`);

  expect({ status: response.status, body: response.data }).toEqual({
    status: 200,
    body: "Hello"
  });

  done();
});

test("hello route with name", async (done): Promise<void> => {
  const name = "joy";
  const response = await axios.get(`${url}/hello/${name}`);

  expect({ status: response.status, body: response.data }).toEqual({
    status: 200,
    body: `Hello ${name}`
  });

  done();
});
