import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api", router);

export default app;
