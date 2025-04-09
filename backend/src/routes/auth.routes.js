import express from 'express';
import { createUser, login, logout,fetchUser } from '../controllers/auth.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router =  express.Router()


router.post('/create-user',createUser)
router.post('/login',login)
router.post('/logout',isAuthenticated, logout);
router.get('/user',isAuthenticated, fetchUser);



export default router;