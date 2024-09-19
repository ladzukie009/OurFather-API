import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import generateTokenAndSetCookie from "../utils/generateToken.js";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      throw new Error("This fields are required");
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("Email already exist");
    }

    if (password !== confirmPassword) {
      throw new Error("Password doesn't match");
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send({ message: "Account successfully created!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email doesn't match in our records");
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is not correct");
    }

    if (user.role !== "user") {
      throw new Error("You are not authorized to perform this action");
    }

    if (user.isFirstTimeLogin) {
      generateTokenAndSetCookie(user._id, res);

      res.status(200).send({
        userId: user._id,
        isFirstTimeLogin: user.isFirstTimeLogin,
        role: user.role,
      });
    } else {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).send({
        token,
        userId: user._id,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createUser, loginUser };
