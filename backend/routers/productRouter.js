import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();
// show data in front end *****
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  "/shop",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
  })
);
// show productDetails *************
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // const id = mongoose.Types.ObjectId.isValid(req.params.id);
    // const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found " });
    }
  })
);
export default productRouter;
