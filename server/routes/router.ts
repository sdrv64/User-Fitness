import express from "express";
import {
  getProgress,
  homePage,
  login,
  register,
} from "../controllers/controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, homePage);
router.get("/", authMiddleware, getProgress);
router.post("/register", register);
router.post("/login", login);

export default router;
