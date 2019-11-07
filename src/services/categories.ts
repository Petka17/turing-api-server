import { FindManyOptions, Repository } from "typeorm";

import { getRepository } from "../database/connection";
import Category from "../database/models/category";
import { CategoryListResponse, CategoryResponse } from "../interfaces";

export const getCategories = async (
  page: number = 1,
  limit: number = 20,
  order: string = ""
): Promise<CategoryListResponse> => {
  const repo: Repository<Category> = await getRepository(Category);

  const pageNorm = page < 1 ? 1 : page;
  const skip = limit * (pageNorm - 1);

  const findOptions: FindManyOptions<Category> = {
    select: ["category_id", "name", "description", "department_id"],
    skip,
    take: limit
  };

  if (order === "category_id") {
    findOptions.order = { category_id: "ASC" };
  } else if (order === "name") {
    findOptions.order = { name: "ASC" };
  }

  const result = await repo.find(findOptions);

  return { count: result.length, rows: result };
};

export const getCategoryById = async (
  categoryId: number
): Promise<CategoryResponse | undefined> => {
  const repo: Repository<Category> = await getRepository(Category);

  return repo.findOne(categoryId, {
    select: ["category_id", "name", "description", "department_id"]
  });
};
