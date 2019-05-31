import request from "supertest";
import { Repository } from "typeorm";

import { getRepository } from "../../src/database/connection";
import Department from "../../src/database/models/department";
import createServer from "../../src/server";

let app: any;
let depRepo: Repository<Department>;

const name = "Test Department";
const desc = "Very important department";
const ids = [1, 2, 3];

beforeAll(
  async (): Promise<void> => {
    app = createServer().getApp();

    depRepo = await getRepository(Department);

    // TODO: refactor this ugly test data creation
    for (let i in ids) {
      await depRepo.save(
        depRepo.create({
          name: `${name} ${ids[i]}`,
          description: `${desc} ${ids[i]}`
        })
      );
    }
  }
);

test("Get department list", async (done): Promise<void> => {
  const response = await request(app).get("/departments");

  expect([response.status, response.body]).toEqual([
    200,
    ids.map(
      (
        num: number
      ): { department_id: number; name: string; description: string } => ({
        department_id: num,
        name: `${name} ${num}`,
        description: `${desc} ${num}`
      })
    )
  ]);

  done();
});

test("Get one department", async (done): Promise<void> => {
  const id = 2;
  const response = await request(app).get(`/departments/${id}`);

  expect([response.status, response.body]).toEqual([
    200,
    {
      department_id: id,
      name: `${name} ${id}`,
      description: `${desc} ${id}`
    }
  ]);

  done();
});

// TODO: Add Not found and bad request tests
