const express = require('express');
const app = express();

app.use(express.json());

const productRoutes = require("./Routes/ProductRoute");
const errorMiddleWare = require("./Middleware/error")

app.use("/api/v1", productRoutes);
//Middleware For Error
app.use(errorMiddleWare);
module.exports = app;