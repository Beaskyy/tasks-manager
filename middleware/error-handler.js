const { CustomApiError } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ message: `Something went wrong, try again` });
};

module.exports = errorHandlerMiddleware;
