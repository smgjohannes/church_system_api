const express = require('express');

const UserController = require('./controllers/userController');
const MemberController = require('./controllers/memberController');
const PaymentController = require('./controllers/paymentController');
const ExpenseController = require('./controllers/expenseController');
const ImageController = require('./controllers/imageController');
const ReportController = require('./controllers/reportController');
const AuthController = require('./controllers/authController');

// validators
const userValidation = require('./validations/userValidation');
const memberValidation = require('./validations/memberValidation');
const paymentValidation = require('./validations/paymentValidation');
const expenseValidation = require('./validations/expenseValidation');
const authValidation = require('./validations/authValidation');
// Middleware with dependence
const AuthMiddleware = require('./middleware/authMiddleware');
const CorsMiddleware = require('./middleware/corsMiddleware');

// Simple middleware
const adminMiddleware = require('./middleware/adminMiddleware');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');

const upload = require('../utils/multer');

/**
 * @description Return object of routes.
 * @param {Object} app - app object.
 * @returns {Object} Return object of routes.
 * @example
 * getRoutes(app);
 */
function getRoutes(app) {
  const userController = UserController(app);
  const memberController = MemberController(app);
  const paymentController = PaymentController(app);
  const expenseController = ExpenseController(app);
  const imageController = ImageController(app);
  const reportController = ReportController(app);
  const authController = AuthController(app);

  const router = express.Router();

  // enable cross origin requests
  router.use(CorsMiddleware);

  const authMiddleware = AuthMiddleware('post:write', app);

  // AUTH
  router.post(
    '/login',
    rateLimitMiddleware,
    userValidation.loginSchema,
    userController.login
  );
  router
    .route('/members')
    .get(memberController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.createSchema,
      memberController.create
    );
  // AUTH
  router.post(
    '/auth',

    rateLimitMiddleware,
    authValidation.registerSchema,
    authController.post
  );
  router.post(
    '/auth/login',

    rateLimitMiddleware,
    authValidation.loginSchema,
    authController.login
  );
  router.post(
    '/auth/confirmEmail',
    rateLimitMiddleware,
    authController.confirmEmail
  );
  router.post(
    '/auth/resendConfirmation',
    rateLimitMiddleware,
    authController.resendConfirmation
  );
  router.post(
    '/auth/forgot-password',
    // resetProtectMiddleware,
    rateLimitMiddleware,
    authValidation.forgotPasswordSchema,
    authController.forgotPassword
  );
  router.post(
    '/auth/reset-password',
    rateLimitMiddleware,
    authValidation.resetPasswordSchema,
    authController.resetPassword
  );
  router.get(
    '/auth/:email/email',
    rateLimitMiddleware,
    authController.emailExist
  );
  router
    .route('/members/:id')
    .get(memberController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.updateSchema,
      memberController.update
    )
    .delete(authMiddleware, memberController.destroy);
  // IMAGE ROUTES
  router.post(
    '/images/:entity_id',
    authMiddleware,
    upload.manyFiles(),
    imageController.upload
  );

  router.delete('/images/:id', authMiddleware, imageController.destroy);

  // payments ROUTES
  router.get('/payments/stats', authMiddleware, paymentController.stats);

  // payments ROUTES
  router.get(
    '/payments/getAccountDetails/:account',
    authMiddleware,
    paymentController.getAccountDetails
  );
  // report ROUTES
  router.get('/reports', reportController.generate);

  router
    .route('/payments')
    .get(paymentController.get)
    .post(
      authMiddleware,
      paymentValidation.createSchema,
      paymentController.create
    );

  router
    .route('/payments/:id')
    .get(paymentController.getById)
    .patch(
      authMiddleware,
      paymentValidation.updateSchema,
      paymentController.update
    )
    .delete(authMiddleware, paymentController.destroy);
  // Expense Routes
  router
    .route('/expenses')
    .get(expenseController.get)
    .post(
      authMiddleware,
      expenseValidation.createSchema,
      expenseController.create
    );

  router
    .route('/expenses/:id')
    .get(expenseController.getById)
    .patch(
      authMiddleware,
      expenseValidation.updateSchema,
      expenseController.update
    )
    .delete(authMiddleware, expenseController.destroy);
  // USER
  router.get('/users', authMiddleware, adminMiddleware, userController.get);
  router
    .route('/users/:id')
    .get(authMiddleware, adminMiddleware, userController.getById)
    .patch(
      authMiddleware,
      adminMiddleware,
      userValidation.updateUserSchema,
      userController.update
    );

  // CURRENT USER
  router.post(
    '/me/update-password',
    authMiddleware,
    userValidation.updatePasswordSchema,
    userController.updatePassword
  );

  router
    .route('/me')
    .get(authMiddleware, userController.getMe)
    .patch(
      authMiddleware,
      userValidation.updateUserSchema,
      userController.updateMe
    );

  return router;
}

module.exports = getRoutes;
