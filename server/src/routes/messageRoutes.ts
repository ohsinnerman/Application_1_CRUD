import express from 'express';
import passport from 'passport';
import { getChatMessages } from '../controllers/messageController';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/:chatId', auth, getChatMessages);

export default router;
