const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/ErrorHandler");

//Create a product --ADMIN
exports.createProduct = async (req, resp) => {
  const product = await Product.create(req.body);

  resp.status(201).json({
    success: true,
    product,
  });
};

//Get all products
exports.getAllProducts = async (req, resp) => {
  const products = await Product.find();
  resp.status(200).json({
    success: true,
    products,
  });
};

//Update products -- ADMIN
exports.updateProduct = async (req, resp, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return resp.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  resp.status(200).json({
    success: true,
    product,
  });
};

//Delete products -- ADMIN
exports.deleteProduct = async (req, resp, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return resp.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.deleteOne();

  resp.status(200).json({
    success: true,
    message: "Product Was Removed Successfully!!",
  });
};

//Get Product Details products -- ADMIN
export const getProductDetails = async (req, resp, next) => {
  let product = await Product.findById(req.params.id);
  console.log(product)
  if (!product) {
    console.log("inside no product")
     return next(new ErrorHandler(404, "Product Not Found"));
  }

  resp.status(200).json({
    success: true,
    product,
  });
};
