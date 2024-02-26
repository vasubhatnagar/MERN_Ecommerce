const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../Controller/ProductController");
const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/new").post(createProduct);
Router.route("/product/:id").delete(deleteProduct).get(getProductDetails).put(updateProduct);;

module.exports=Router;