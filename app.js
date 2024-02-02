const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const globalError = require('./middlewares/errorMiddleware');
const ApiError=require('./utils/apiError')
const productRoute = require('./routes/product');

app.use(express.json());

app.use('/api/v1/product', productRoute);



app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
