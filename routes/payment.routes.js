import {Router} from 'express'
import { buySubscription, cancelSubscription, getAllpayments, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller.js';
import { authorisedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router=Router();

router
.route('/razorpay-key')
.get(isLoggedIn, getRazorpayApiKey)


router.route('/subscribe')
.post(isLoggedIn,buySubscription)


router.route('/verify')
.post(isLoggedIn,verifySubscription)


router
.route('unsubscribe')
.post(isLoggedIn,cancelSubscription)


router.route('/')
.get(isLoggedIn,authorisedRoles('admin'),getAllpayments)

export default router