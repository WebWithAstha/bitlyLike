import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createShortLink, getAllLinks, getLinkAnalytics } from '../controllers/link.controllers.js';
const router =  express.Router()

router.post('/shorten', isAuthenticated, createShortLink);
router.get('/', isAuthenticated, getAllLinks);
router.get('/:linkId', isAuthenticated, getLinkAnalytics);

export default router;
