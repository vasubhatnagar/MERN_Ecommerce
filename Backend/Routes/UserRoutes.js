const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../Controller/UserController");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/Auth");

const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(loginUser);
Router.route("/password/forgot").post(forgotPassword);
Router.route("/password/reset/:token").put(resetPassword);
Router.route("/logout").post(logout);
Router.route("/me").get(isAuthenticatedUser, getUserDetails);
Router.route("/password/update").put(isAuthenticatedUser, updatePassword);
Router.route("/me/update").put(isAuthenticatedUser, updateProfile);
Router.route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
Router.route("/admin/users").get(
  isAuthenticatedUser, 
  authorizedRoles("admin"),
  getAllUsers
);

module.exports = Router;
