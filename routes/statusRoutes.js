import * as status from "../controllers/statusController.js";
import { Router } from "express";

const router = Router();

router.post("/create", status.createStatus);
router.get("/get-all", status.getAllStatus);

export default router;
