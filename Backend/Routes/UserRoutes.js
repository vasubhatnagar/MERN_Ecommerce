const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../Controller/UserController");
const { isAuthenticatedUser } = require("../Middleware/Auth");

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/logout").post(logout);
Router.route("/me").get(isAuthenticatedUser, getUserDetails);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = Router;