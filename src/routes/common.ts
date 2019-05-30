type ErrorCode = "USR_01" | "USR_02";

type ErrorResponseCode = "500" | "400" | "401";

interface CustomError {
  code: ErrorCode;
  message: string;
  field: string;
  status: ErrorResponseCode;
}

export { CustomError };
