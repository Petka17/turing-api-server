import { Repository } from "typeorm";

import { getRepository } from "../database/connection";
import Department from "../database/models/department";
import { DepartmentResponse } from "../interfaces";

export const getAllDepartments = async (): Promise<DepartmentResponse[]> => {
  const repo: Repository<Department> = await getRepository(Department);

  return await repo.find({
    select: ["department_id", "name", "description"]
  });
};

export const getDepartmentById = async (
  departmentId: number
): Promise<DepartmentResponse | undefined> => {
  const repo: Repository<Department> = await getRepository(Department);

  return await repo.findOne(departmentId, {
    select: ["department_id", "name", "description"]
  });
};
