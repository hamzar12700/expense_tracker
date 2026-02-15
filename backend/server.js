import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import router from "./router/itemRouter.js";

config();
connectDB();

const app = express();

app.use(cors());
app.use(json());

app.use("/api/items", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
