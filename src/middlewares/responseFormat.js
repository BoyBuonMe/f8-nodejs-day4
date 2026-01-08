const response = (_, res, next) => {
  res.success = (data, status = 200, props = {}) => {
    res.status(status).json({
      status: "Success",
      data,
      ...props,
    });
  };

  res.error = (status = 500, message, error = null) => {
    res.status(status).json({
      status: "error",
      message,
      error,
    });
  };

  next();
};

module.exports = response;
