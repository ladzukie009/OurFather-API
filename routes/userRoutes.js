import * as user from "../controllers/userController.js";
import { Router } from "express";
import { protect, protectByRole } from "../middlewares/protect.js";
import { userRole } from "../constants/globalConst.js";

const router = Router();

router.post("/register", user.createUser);
router.post("/login", protectByRole(userRole), user.loginUser);

export default router;
