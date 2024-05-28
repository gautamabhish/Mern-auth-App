import express from 'express'
import updateUser, {testRoute} from '../controllers/userController.js';
import { verifyToken } from '../Utils/verifyUser.js';

const router = express.Router();


router.get('/', testRoute);

router.post("/update/:id",verifyToken,updateUser)

export default router ;



