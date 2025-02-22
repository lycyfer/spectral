import express from "express"
import { bookingHall, deleteBooking, getBookedHalls } from '../controller/booking.controller.js';




const router = express.Router()

router.post("/hall", bookingHall)
router.get("/get", getBookedHalls)
router.delete("/delete/:id", deleteBooking)

export default router;