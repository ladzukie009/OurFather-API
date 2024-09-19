import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error("Invalid token");
    }
    req.user = { userId: user._id };
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const protectByRole = (role) => {
  return (req, res, next) => {
    try {
      const userRole = req.body.role;

      if (!role.includes(userRole)) {
        throw new Error("You are not authorized to perform this action");
      }
      next();
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  };
};

export { protect, protectByRole };
