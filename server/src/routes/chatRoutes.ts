import express from 'express';
import passport from 'passport';
import { createChat, getMyChats, getChatDetails } from '../controllers/chatController';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, createChat);
router.get('/', auth, getMyChats);
router.get('/:id', auth, getChatDetails);

export default router;
