import express from "express";
import { uploadHandler } from "../controllers/uploadController.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const uploadRoute = express.Router();
uploadRoute.post("/", uploadImage.single("image"), uploadHandler);

export default uploadRoute;
