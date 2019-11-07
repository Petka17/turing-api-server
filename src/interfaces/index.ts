type ErrorCode = "USR_01" | "USR_02";

type ErrorResponseCode = "500" | "400" | "401";

export interface CustomError {
  code: ErrorCode;
  message: string;
  field: string;
  status: ErrorResponseCode;
}

export interface DepartmentResponse {
  department_id?: number;
  name?: string;
  description?: string;
}

export interface CategoryShortResponse {
  category_id?: number;
  name?: string;
  department_id?: number;
}

export interface CategoryResponse extends CategoryShortResponse {
  description?: string;
}

export interface CategoryListResponse {
  count: number;
  rows: CategoryResponse[];
}
