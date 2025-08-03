import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    let token_decode;
    if (Array.isArray(token)) {
      const secret = process.env.JWT_SECRET as string;
      token_decode = jwt.verify(token[0], secret);
    } else if (typeof token === "string") {
      const secret = process.env.JWT_SECRET as string;
      token_decode = jwt.verify(token, secret);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    if (!req.body) req.body = {};
    req.body.id = token_decode;
    console.log(req.body.id.id);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
