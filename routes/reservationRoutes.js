import * as reservation from "../controllers/reservationController.js";
import { Router } from "express";

const router = Router();

router.post("/create", reservation.createReservation);
router.get("/get-all", reservation.getAllActiveReservation);
router.post("/get-by-name", reservation.getReservationByName);

export default router;
