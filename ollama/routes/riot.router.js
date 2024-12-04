import express from 'express';
import { accountsByGameNameTagLine, accountsByPuuid } from '../controllers/riot.controller.js';

const router = express.Router()

router.get("/account", accountsByGameNameTagLine)

export default router;