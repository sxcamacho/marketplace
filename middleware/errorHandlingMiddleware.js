import CustomError from "../utils/CustomError.js";

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      // you might not want to expose all error details in production
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  } else {
    res.status(500).json(err);
  }
};

export default errorHandlingMiddleware;
