import request from "supertest";
import { Repository } from "typeorm";

import { getRepository, reloadEntities } from "../../src/database/connection";
import Department from "../../src/database/models/department";
import createServer from "../../src/server";

let app: any;

let depRepo: Repository<Department>;
const name = "Test Department";
const desc = "Very important department";
const ids = [1, 2, 3];

beforeAll(
  async (done): Promise<void> => {
    app = createServer().getApp();

    await reloadEntities();

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

    done();
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

test("Get one department with non-existing id", async (done): Promise<void> => {
  const id = 99;
  const response = await request(app).get(`/departments/${id}`);

  expect([response.status, response.body]).toEqual([
    404,
    {
      error: {
        status: 404,
        message: `DEP_02: Doesn't exist department with this ID: ${id}`
      }
    }
  ]);

  done();
});

test("Get one department with non-number id", async (done): Promise<void> => {
  const response = await request(app).get(`/departments/id`);

  expect([response.status, response.body]).toEqual([
    400,
    {
      error: {
        status: 400,
        message: "DEP_01: The ID is not a number."
      }
    }
  ]);

  done();
});
