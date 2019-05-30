import { GET, Path, PathParam } from "typescript-rest";
import { IsLong, Response, Tags } from "typescript-rest-swagger";

import { CustomError } from "./common";

interface DepartmentResponse {
  department_id: number;
  name: string;
  description: string;
}

@Tags("departments")
@Path("/departments")
class DepartmentsController {
  /**
   * Return a list of department.
   * @summary Get Departments
   */
  @Response<CustomError>(400, "Return a error object")
  @GET
  public list(): DepartmentResponse[] {
    return [
      {
        department_id: 1,
        name: "Regional",
        description:
          "Proud of your country? Wear a T-shirt with a national symbol stamp!"
      }
    ];
  }

  /**
   * Return a department by ID.
   * @summary Get Department by ID
   * @param departmentId ID of Department
   */
  @Response<CustomError>(400, "Return a error object")
  @Path(":department_id")
  @GET
  public detail(
    @PathParam("department_id") @IsLong departmentId: number
  ): DepartmentResponse {
    return {
      department_id: 1,
      name: "Regional",
      description:
        "Proud of your country? Wear a T-shirt with a national symbol stamp!"
    };
  }
}

export default DepartmentsController;
