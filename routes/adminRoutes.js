import * as admin from "../controllers/adminController.js";
import { Router } from "express";
import { protect, protectByRole } from "../middlewares/protect.js";
import { adminRole } from "../constants/globalConst.js";

const router = Router();

router.post("/all-user", protectByRole(adminRole), admin.getAllUser);

export default router;
