const express = require("express");
const { specs, swaggerUi } = require("./swagger");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const subCategoryRoute = require("./routes/subcategory");
const fileUpload = require("express-fileupload");

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    uploadTempDir: "/tmp",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/subcategory", subCategoryRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
