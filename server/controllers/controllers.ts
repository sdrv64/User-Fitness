import { Request, Response } from "express";
import User from "../models/userDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import Progress from "../models/progressDb";

function createToken(id: string) {
  const secret = <string>process.env.JWT_SECRET;
  return jwt.sign({ id }, secret);
}

export async function homePage(req: Request, res: Response) {
  const { reps, calories, weight } = req.body;
  try {
    if (!reps || !calories || !weight) {
      return res.status(400).json({
        sucess: false,
        message: "Please provide all entries",
      });
    }
    const userId = req.body.id.id;

    const progress = new Progress({
      reps,
      calories,
      weight,
      userId,
    });

    await progress.save();
    res.status(201).json({
      sucess: true,
      message: "Progress has been saved successfully",
    });
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

export async function getProgress(req: Request, res: Response) {
  try {
    const userId = req.body.id.id;
    const progress = await Progress.find({ userId }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      progress,
    });
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

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email and password",
      });
    }
    const isFound = await User.findOne({ email });

    if (isFound) {
      return res.status(400).json({
        success: false,
        message: "Dubplicate Email Address",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Email Address",
      });
    }
    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Please provdie a strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(String(user._id));
    const secret = process.env.JWT_SECRET as string;
    const decoded = await jwt.verify(token, secret);
    console.log(decoded);

    return res.status(201).json({
      success: true,
      name: user.name,
      token,
      message: "Registered Successfully",
    });
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

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User doesn't exists",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(String(user._id));
      res.status(200).json({
        success: true,
        name: user.name,
        token,
        message: "Logged Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  }
  try {
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
