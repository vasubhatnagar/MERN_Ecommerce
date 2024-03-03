const jwt = require("jsonwebtoken");
const CatchAsyncError = require("./CatchAsyncError");
const User = require("../Models/userModel");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.isAuthenticatedUser = CatchAsyncError(async (req, rep, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Kindly login to use the feature!! :D"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, resp, next) => {
    console.log(req.user)
    if (!roles.includes(req.user.role)) {
     return next( new ErrorHandler(403,"Unauthorized Role. Kindly request access from your administration"));
    }
    next();
  };
  
};
