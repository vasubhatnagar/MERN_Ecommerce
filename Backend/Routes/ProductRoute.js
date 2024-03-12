const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  getProductReviews,
  deleteReview,
} = require("../Controller/ProductController");
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/Auth");
const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/admin/product/new").post(
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);
Router.route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct);

Router.route("/product/:id").get(getProductDetails)

Router.route("/review").put(isAuthenticatedUser,createReview)
Router.route("/review").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
module.exports = Router;
