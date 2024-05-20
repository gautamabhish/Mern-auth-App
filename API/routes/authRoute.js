import express from 'express'
import { auth } from '../controllers/authConroller.js';
const router = express.Router();

router.post("/sign-up",auth)

export default router
