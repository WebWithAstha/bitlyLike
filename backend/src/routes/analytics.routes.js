import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getLinkAnalytics, getUserLinksStats } from '../controllers/analytics.controllers.js';
const router =  express.Router()

router.get('/overview', isAuthenticated, getUserLinksStats);
router.get('/:linkId', isAuthenticated, getLinkAnalytics);

export default router;
