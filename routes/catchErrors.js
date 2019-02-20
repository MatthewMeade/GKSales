// Catch Errors
// Wraps async functions in a catch
module.exports = catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(err => {
      console.log(err);
      res.status(400).send(err.toString());
    });
  };
};
