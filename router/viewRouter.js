const express = require('express');
const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/', authController.isLogedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLogedIn, viewController.gettour);
router.get('/login', authController.isLogedIn, viewController.getLoginPage);
router.get('/me', authController.protect, viewController.getAccountPage);
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
