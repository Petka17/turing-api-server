import { GET, Path, PathParam, QueryParam } from "typescript-rest";
import { IsInt, IsLong, Response, Tags } from "typescript-rest-swagger";

import {
  CategoryListResponse,
  CategoryResponse,
  CategoryShortResponse,
  CustomError
} from "../interfaces";
import { getCategories } from "../services/categories";

@Tags("categories")
@Path("/categories")
class CategoriesController {
  /**
   *  Return a list of categories.
   * @summary Get categories
   * @param order Sorting a field. Allowed fields: 'category_id', 'name'.
   * @param page Inform the page. Starting with 1. Default: 1
   * @param limit Limit per page, Default: 20.
   */
  @Response<CategoryListResponse>(
    200,
    "Return a list with count (total categories) and the rows of Categories"
  )
  @Response<CustomError>(400, "Return a error object")
  @GET
  public async list(
    @QueryParam("page") @IsInt page?: number,
    @QueryParam("limit") @IsInt limit?: number,
    @QueryParam("order") order?: string
  ): Promise<CategoryListResponse> {
    return getCategories(page, limit, order);
  }

  /**
   * Return a category by ID.
   * @summary Get Category by ID
   * @param categoryId ID of Category
   */
  @Response<CategoryResponse>(200, "Return a object of Category")
  @Response<CustomError>(400, "Return a error object")
  @Path(":category_id")
  @GET
  public detail(
    @PathParam("category_id") @IsLong categoryId: number
  ): CategoryResponse {
    return {
      category_id: 1,
      name: "Regional",
      description:
        "Proud of your country? Wear a T-shirt with a national symbol stamp!",
      department_id: 1
    };
  }

  /**
   * Return a list of categories from a Product ID
   * @summary Get Categories of a Product
   * @param productId ID of Product
   */
  @Response<CategoryShortResponse[]>(200, "Return a array of Category Objects")
  @Response<CustomError>(400, "Return a error object")
  @Path("inProduct/:product_id")
  @GET
  public listByProduct(
    @PathParam("product_id") @IsLong productId: number
  ): CategoryShortResponse[] {
    return [
      {
        category_id: 1,
        department_id: 1,
        name: "French"
      }
    ];
  }

  /**
   * Return a list of categories from a Department ID
   * @summary Get Categories of a Department
   * @param departmentId ID of Department
   */
  @Response<CategoryShortResponse[]>(200, "Return a array of Category Objects")
  @Response<CustomError>(400, "Return a error object")
  @Path("inDepartment/:department_id")
  @GET
  public listByDepartment(
    @PathParam("department_id") @IsLong departmentId: number
  ): CategoryResponse[] {
    return [
      {
        category_id: 1,
        name: "French",
        description:
          "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
        department_id: 1
      }
    ];
  }
}

export default CategoriesController;
