import express from "express";
import { getAgents } from "../controllers/valorant.controller.js";

const router = express.Router()

router.get('/valorant/agents', getAgents)

export default router