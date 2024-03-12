const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.newOrder = CatchAsyncError(async (req, resp, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  resp.status(201).json({
    success: true,
    order,
  });
});

//get order details

exports.getOrderDetails = CatchAsyncError(async (req, resp, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(404, "Order Not Found"));
  }

  resp.status(200).json({
    success: true,
    order,
  });
});

//Get my orders

exports.getMyOrders = CatchAsyncError(async (req, resp, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new ErrorHandler(404, "Order Not Found"));
  }

  resp.status(200).json({
    success: true,
    order,
  });
});

//Get all  orders -- Admin

exports.getAllOrders = CatchAsyncError(async (req, resp, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHandler(404, "Orders Not Found"));
  }

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  resp.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

//UpdateOrderStatus -- Admin

exports.updateOrder = CatchAsyncError(async (req, resp, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler(400, "Order Already Delivered"));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status == "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  resp.status(200).json({
    success: true,
    order
  });
});

//Delete Order -- Admin

exports.deleteOrder = CatchAsyncError(async (req, resp, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(440400, "Order Not Found"));
  }

  await order.remove();

  resp.status(200).json({
    success: true
  });
});

async function updateStock(productId, qty) {
  const product = await Product.findById(productId);
  product.stock -= qty;
  await product.save({ validateBeforeSave: false });
}
