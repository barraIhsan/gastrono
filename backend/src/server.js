import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
