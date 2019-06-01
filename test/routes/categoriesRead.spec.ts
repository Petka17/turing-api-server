import R from "ramda";
import request from "supertest";
import { Repository } from "typeorm";

import { getRepository, reloadEntities } from "../../src/database/connection";
import Category from "../../src/database/models/category";
import Department from "../../src/database/models/department";
import createServer from "../../src/server";

let app: any;

let depRepo: Repository<Department>;
const depName = "Test Department";
const depDesc = "Very important department";
const depIds = [1, 2];
const deps: Department[] = [];

let catRepo: Repository<Category>;
const catName = "Test Category";
const catDesc = "Very important category";
const catIds = R.range(1, 31);

const catDepId = (i: string | number): number => (+i % 2) + 1;

beforeAll(
  async (done): Promise<void> => {
    app = createServer().getApp();

    await reloadEntities();

    depRepo = await getRepository(Department);
    // TODO: refactor this ugly test data creation
    for (let i in depIds) {
      deps.push(
        depRepo.create({
          name: `${depName} ${depIds[i]}`,
          description: `${depDesc} ${depIds[i]}`
        })
      );
      await depRepo.save(deps[i]);
    }
    catRepo = await getRepository(Category);
    // TODO: refactor this ugly test data creation
    for (let i in catIds) {
      await catRepo.save(
        catRepo.create({
          name: `${catName} ${catIds[i]}`,
          description: `${catDesc} ${catIds[i]}`,
          department: deps[catDepId(catIds[i]) - 1]
        })
      );
    }

    done();
  }
);

test("Get category list", async (done): Promise<void> => {
  const response = await request(app).get("/categories");

  expect([response.status, response.body]).toEqual([
    200,
    {
      count: 20,
      rows: R.range(1, 21).map(
        (
          num: number
        ): {
          category_id: number;
          name: string;
          description: string;
          department_id: number;
        } => ({
          category_id: num,
          name: `${catName} ${num}`,
          description: `${catDesc} ${num}`,
          department_id: catDepId(num)
        })
      )
    }
  ]);

  done();
});
