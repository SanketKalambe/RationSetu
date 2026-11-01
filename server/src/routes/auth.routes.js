const express = require('express');
const router = express.Router();
const {
  registerDistributor,
  registerConsumer,
  login,
  sendOtp,
  verifyOtpHandler
} = require('../controllers/auth.controller');
const {
  validateDistributorRegister,
  validateConsumerRegister
} = require('../middleware/validation.middleware');

router.post('/distributor/register', validateDistributorRegister, registerDistributor);
router.post('/consumer/register', validateConsumerRegister, registerConsumer);
const { getWebAuthnChallenge } = require('../controllers/epos.controller');

router.post('/login', login);
router.post('/otp/send', sendOtp);
router.post('/otp/verify', verifyOtpHandler);
router.get('/webauthn-challenge', getWebAuthnChallenge);

module.exports = router;
