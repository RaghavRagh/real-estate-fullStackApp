import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavourites,
  toFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.get("/allBookings", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:id", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFavourites);

export { router as userRoute };
