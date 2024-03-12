const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Product = require("../Models/productModel");
const ApiFeatures = require("../Utils/ApiFeatures");
const ErrorHandler = require("../Utils/ErrorHandler");

//Create a product --ADMIN

exports.createProduct = CatchAsyncError(async (req, resp) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  resp.status(201).json({
    success: true,
    product,
  });
});

//Get all products
exports.getAllProducts = CatchAsyncError(async (req, resp) => {
  const ResultPerPage = 5;
  const totalProductCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(ResultPerPage);
  const products = await apiFeature.query;
  console.log(products);
  resp.status(200).json({
    success: true,
    products,
    totalProductCount,
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

exports.createReview = CatchAsyncError(async (req, resp, next) => {
  const productReview = {
    name: req.user.name,
    user: req.user.id,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return next(new ErrorHandler(404, "No product Found with mentioned ID"));
  }
  const isAlreadyReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );
  if (isAlreadyReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = Number(productReview.rating);
        rev.comment = productReview.comment;
      }
    });
  } else {
    product.reviews.push(productReview);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  resp.status(200).json({
    success: true,
    product,
  });
});

exports.getProductReviews = CatchAsyncError(async (req, resp, next) => {

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(
      new ErrorHandler(404, "Product with mentioned ID was not found!")
    );
  }
  resp.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = CatchAsyncError(async (req, resp, next) => {
  const product = await Product.findById(req.query.ProductId);

  if (!product) {
    return next(
      new ErrorHandler(404, "Product with mentioned ID was not found!")
    );
  }
  //select all reviews but ignore the one which has matching ID

  product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  product.numOfReviews = product.reviews.length;
  await product.save({ validateBeforeSave: false });
  resp.status(200).json({
    success: true,
    product,
  });
});
