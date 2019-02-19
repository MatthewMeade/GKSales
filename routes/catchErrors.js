// Catch Errors
// Wraps async functions in a catch
module.exports = catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(err => res.status(400).json(err));
  };
};
