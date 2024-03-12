const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/Auth");
const {
  newOrder,
  getOrderDetails,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controller/OrderController");
const Router = express.Router();

Router.route("/order/new").post(isAuthenticatedUser, newOrder);
Router.route("/order/:id").get(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getOrderDetails
);
Router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
Router.route("/admin/orders").get(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getAllOrders
);
Router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = Router;
