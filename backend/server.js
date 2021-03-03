import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port 5000`.yellow.bold
  )
);
