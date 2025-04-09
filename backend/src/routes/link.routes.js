import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createShortLink, getAllLinks } from '../controllers/link.controllers.js';
const router =  express.Router()

router.post('/shorten', isAuthenticated, createShortLink);
router.get('/', isAuthenticated, getAllLinks);

export default router;
