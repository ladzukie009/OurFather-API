import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectDB } from "./config/database.js";

// user routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

// initialize app
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const startServer = () => {
  try {
    connectDB();
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// endpoints
app.get("/api/test", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/status", statusRoutes);
