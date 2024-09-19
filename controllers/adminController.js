import User from "../models/user.js";
import * as dotenv from "dotenv";
dotenv.config();

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    const filteredData = users.filter((user) => user.role === "user");

    res.status(200).send({ users: filteredData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { getAllUser };
