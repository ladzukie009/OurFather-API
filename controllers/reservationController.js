import Reservation from "../models/reservation.js";

const createReservation = async (req, res) => {
  try {
    const { userId, planId, reservationName, type, price } = req.body;

    if (!userId || !planId || !reservationName || !type || !price) {
      throw new Error("This fields are required");
    }

    const existingReservation = await Reservation.findOne({
      userId,
      reservationName,
    });
    if (existingReservation) {
      throw new Error(
        `Reservation with the name ${reservationName} already exists for this user.`
      );
    }

    const newReservation = new Reservation({
      userId,
      planId,
      reservationName,
      type,
      price,
    });

    await newReservation.save();
    res.status(200).send({ message: "Reservation successfully created!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllActiveReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    const filteredData = reservations.filter(
      (reservation) => reservation.isActive
    );

    res.status(200).send({ reservations: filteredData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getReservationByName = async (req, res) => {
  try {
    const { reservationName, userId } = req.body;

    const userReservation = await Reservation.find({
      userId,
      reservationName,
    });

    const filteredData = userReservation.filter(
      (reservation) => reservation.isActive
    );

    res.status(200).send({ reservations: filteredData });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createReservation, getAllActiveReservation, getReservationByName };
