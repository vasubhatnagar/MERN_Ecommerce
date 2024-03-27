const User = require("../Models/userModel");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");
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

  sendToken(user, 201, resp);
});

exports.loginUser = CatchAsyncError(async (req, resp, next) => {
  const { email, password } = req.body;

  //checking if email and pwd are not null

  if (!email || !password)
    return next(new ErrorHandler(400, "PLease enter both email and PWD"));
  console.log("1");
  const user = await User.findOne({ email }).select("+password");
  console.log("2");
  if (!user) {
    console.log("3");
    return next(new ErrorHandler(401, "Invalid User or Password"));
  }

  const isPwdMatched = await user.comparePasswords(password);
  console.log("4", isPwdMatched);
  if (!isPwdMatched) {
    console.log("5");
    return next(new ErrorHandler(401, "Invalid user or password"));
  }

  sendToken(user, 200, resp);
});

exports.logout = CatchAsyncError((req, resp, next) => {
  resp.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  resp.status(200).json({
    success: true,
    message: "User Logged Out!!",
  });
});

exports.forgotPassword = CatchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(404, "No User Found"));
  }

  //get Reset token

  const resetToken = await user.getResetToken();

  await user.save({ validateBeforeSave: false });

  const restLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Hey ${user.name}, \n \n Please click on the provided link to reset your password. If this link is not requested by you, Kindly ignore it. \n\n ${restLink} \n \n Regards, \n Team Vasu Bhatnagar.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `message sent to user : ${user.email} successfully`,
    });
  } catch (ex) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, ex.message));
  }
});

exports.resetPassword = CatchAsyncError(async (req, resp, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "Reset password link is invalid or has been expired."
      )
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Passwords do not match"));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  sendToken(user, 200, resp);
});

exports.updatePassword = CatchAsyncError(async (req, resp, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPwdMatched = await user.comparePasswords(req.body.oldPassword);
  console.log("SSSSTTTAATTT" + isPwdMatched);

  if (!isPwdMatched) {
    return next(
      new ErrorHandler(400, "Old Password does not match with the profile.")
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "New Password does not match with Confirm Password."
      )
    );
  }

  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHandler(400, "You can not update the same password."));
  }

  //if all validations are done then update the password.

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, resp);
});

exports.updateProfile = CatchAsyncError(async (req, resp, next) => {
  const { email, name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { email, name },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  resp.status(201).json({
    success: true,
    message: "Profile updates successfully!!",
    user,
  });
});

//Admin Route
exports.getAllUsers = CatchAsyncError(async (req, resp, next) => {
  const users = await User.find();

  if (!users) {
    return next(new ErrorHandler(404, "No user found !"));
  }

  resp.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = CatchAsyncError(async (req, resp, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler(
        404,
        `No User Found with mentioned IT : ${req.parama.id}`
      )
    );
  }

  resp.status(200).json({
    success: true,
    user,
  });
});

//Update user role -- Admin

exports.updateUserRole = CatchAsyncError(async (req, resp, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  resp.status(200).json({
    success:true,
    user
  });
});


//Delete User -- Admin

exports.deleteUser = CatchAsyncError(async (req, resp, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(
        404,
        `No User Found with mentioned IT : ${req.parama.id}`
      )
    );
  }

  await user.remove();

  resp.status(200).json({
    success:true,
  });
});
