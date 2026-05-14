import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // if error is already ApiError → use it
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }

  // unknown errors (database, code bugs etc.)
  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: null,
  });
};

export { errorHandler };
