import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addHalls, deleteHallById, getHalls, getHallsById, editHall } from "../controller/halls.controller.js";


const router = express.Router()

router.post('/add', addHalls)
router.get('/get', getHalls)
router.get('/get/:id', getHallsById)
router.delete('/delete/:id', deleteHallById)
router.post('/edit/:id', editHall)

export default router;