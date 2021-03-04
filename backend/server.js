import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();

connectDB();

// custome middleware example
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);
// can also be used as
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : req.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port 5000`.yellow.bold
  )
);
