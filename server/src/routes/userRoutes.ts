import express from 'express';
import passport from 'passport';
import { getProfile, searchUsers } from '../controllers/userController';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/me', auth, getProfile);
router.get('/search', auth, searchUsers);

export default router;
