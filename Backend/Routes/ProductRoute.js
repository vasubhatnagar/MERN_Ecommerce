const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../Controller/ProductController");
const { isAuthenticatedUser , authorizedRoles} = require("../Middleware/Auth");
const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
Router.route("/product/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct).get(getProductDetails).put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct);;

module.exports=Router;