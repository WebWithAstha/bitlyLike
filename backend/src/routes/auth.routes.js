import express from 'express';
import { createUser, login, logout } from '../controllers/auth.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router =  express.Router()


router.post('/create-user',createUser)
router.post('/login',login)
router.post('/logout',isAuthenticated, logout);



export default router;