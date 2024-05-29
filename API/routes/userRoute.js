import express from 'express'
import {deleteUser, signOutUser,testRoute} from '../controllers/userController.js';
import updateUser from '../controllers/userController.js';

import { verifyToken } from '../Utils/verifyUser.js';

const router = express.Router();


router.get('/', testRoute);

router.post("/update/:id",verifyToken,updateUser)


router.delete("/delete/:id",verifyToken,deleteUser)

router.get("/sign-out",signOutUser)

export default router ;



