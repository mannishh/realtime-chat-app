import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { registerSchema, loginSchema } from "../../../sharedValidation/auth.schema.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Lax", // Protects against CSRF attacks
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const registerUser = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    const { name, email, password } = validation.data;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // removing password
    const userObject = user.toObject();
    delete userObject.password;

    // generate token
    const token = generateToken(user._id);

    return res.status(201).cookie("token", token, cookieOptions).json({
      message: "User registered successfully",
      user: userObject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    const { email, password } = validation.data;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(user._id);

    const userObject = user.toObject();
    delete userObject.password;

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "Login successful",
      user: userObject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
