import * as plan from "../controllers/planController.js";
import { Router } from "express";

const router = Router();

router.post("/create", plan.createPlan);
router.get("/get-all", plan.getAllPlan);

export default router;
