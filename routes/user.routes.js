import express from 'express';
const router=express.Router();
import {register,login,logout,me} from "../controllers/user.controller.js";
import { isLoggedIn } from '../middlewares/auth.middleware.js';
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,me);



export default router;
