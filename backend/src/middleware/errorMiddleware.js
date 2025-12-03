export const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.status || 500;
  const bodyStatus = statusCode <= 500 ? "fail" : "error";

  // sql duplicate
  if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
    err.message = "Data already exists";
  }

  res.status(statusCode).json({
    status: bodyStatus,
    message: err.message || "Internal Server Error",
  });
};
