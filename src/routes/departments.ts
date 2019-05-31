import { Errors, GET, Path, PathParam } from "typescript-rest";
import { IsLong, Response, Tags } from "typescript-rest-swagger";

import { CustomError, DepartmentResponse } from "../interfaces";
import { getAllDepartments, getDepartmentById } from "../services/department";

@Tags("departments")
@Path("/departments")
class DepartmentsController {
  /**
   * Return a list of department.
   * @summary Get Departments
   */
  @Response<CustomError>(400, "Return a error object")
  @GET
  public async list(): Promise<DepartmentResponse[]> {
    return getAllDepartments();
  }

  /**
   * Return a department by ID.
   * @summary Get Department by ID
   * @param departmentId ID of Department
   */
  @Response<CustomError>(400, "The ID is not a number.")
  @Response<CustomError>(404, "Doesn't exist department with this ID")
  @Path(":department_id")
  @GET
  public async detail(
    @PathParam("department_id") @IsLong departmentId: number
  ): Promise<DepartmentResponse> {
    if (isNaN(departmentId)) {
      throw new Errors.BadRequestError("DEP_01: The ID is not a number.");
    }

    const dep: DepartmentResponse | undefined = await getDepartmentById(
      departmentId
    );

    if (dep) return dep;

    throw new Errors.NotFoundError(
      `DEP_02: Doesn't exist department with this ID: ${departmentId}`
    );
  }
}

export default DepartmentsController;
