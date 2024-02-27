const User = require("../Models/userModel");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.registerUser = CatchAsyncError(async (req, resp, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is public ID",
      public_url: "This is sample URL",
    },
  });

  const token = user.getJWTToken();

  resp.status(200).json({
    token,
    success: true,
  });
});


exports.loginUser = CatchAsyncError(async (req, resp, next)=>{

    const {email, password } = req.body;

    //checking if email and pwd are not null

    if(!email || ! password)
    return next(new ErrorHandler(400, "PLease enter both email and PWD"));
    console.log("1");
    const user = await User.findOne({email}).select("+password");
    console.log("2");
    if(!user){
        console.log("3");
        return next(new ErrorHandler(401, "Invalid User or Password"));
    }

    const isPwdMatched = await user.comparePasswords(password);
    console.log("4", isPwdMatched);
    if(!isPwdMatched){
        console.log("5");
        return next(new ErrorHandler(401,"Invalid user or password"));
    }

    const token = user.getJWTToken();

    resp.status(200).json({
        token,
        success:true
    });
});