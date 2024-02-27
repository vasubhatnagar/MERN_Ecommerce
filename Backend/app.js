const express = require('express');
const app = express();

app.use(express.json());

const productRoutes = require("./Routes/ProductRoute");
const errorMiddleWare = require("./Middleware/error");
const userRoutes = require("./Routes/UserRoutes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes)
//Middleware For Error
app.use(errorMiddleWare);
module.exports = app;