const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Product = require("../Models/productModel");
const ApiFeatures = require("../Utils/ApiFeatures");
const ErrorHandler = require("../Utils/ErrorHandler");

//Create a product --ADMIN

exports.createProduct = CatchAsyncError(async (req, resp) => {
  const product = await Product.create(req.body);

  resp.status(201).json({
    success: true,
    product,
  });
});

//Get all products
exports.getAllProducts = CatchAsyncError(async (req, resp) => {
  const ResultPerPage = 5;
  const totalProductCount = Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(ResultPerPage);
  const products = await apiFeature.query;
  resp.status(200).json({
    success: true,
    products,
    totalProductCount
  });
});

//Update products -- ADMIN
exports.updateProduct = CatchAsyncError(async (req, resp, next) => {
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
});

//Delete products -- ADMIN
exports.deleteProduct = CatchAsyncError(async (req, resp, next) => {
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
});

//Get Product Details products -- ADMIN
exports.getProductDetails = CatchAsyncError(async (req, resp, next) => {
  let product = await Product.findById(req.params.id);
  console.log(product);
  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  resp.status(200).json({
    success: true,
    product,
  });
});
