const { Error400 } = require('../../utils/httpErrors');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const LOGIN_TOKEN_VALIDITY_IN_SECONDS = 30 * 24 * 60 * 60;

module.exports = function AuthController(app) {
  /**
   * @api {get} /api/v1/auth register
   * @apiName register
   * @apiGroup Auth
   *
   */
  async function post(req, res, next) {
    let user;

    if (req.body.provider === 'local') {
      user = await app.auth.post(req.body);
    } else {
      user = await app.auth.socialLogin({
        access_token: req.query.access_token,
        provider: req.query.provider,
        useragent: req.headers['user-agent'],
        ip: req.ip,
      });
    }

    if (user) {
      const scope = req.body.scope || ['event:write', 'event:read'];
      const token = await app.token.create(
        user.id,
        scope,
        LOGIN_TOKEN_VALIDITY_IN_SECONDS,
        req.headers['user-agent']
      );

      const response = Object.assign({}, user, token);

      res.json(response);
    }

    throw new Error400('We could not perform your request.');
  }

  /**
   * @api {get} /api/v1/auth/login login user
   * @apiName login
   * @apiGroup Auth
   *
   */
  async function login(req, res, next) {
    const formData = req.body;
    const login = await app.auth.login({
      ...formData,
      ip: req.ip,
      useragent: req.headers['user-agent'],
    });

    const { user } = login;

    if (login.requireVerification) {
      res.json(login);
    } else {
      const scope = req.body.scope || ['event:write', 'event:read'];
      const token = await app.token.create(
        user.id,
        scope,
        LOGIN_TOKEN_VALIDITY_IN_SECONDS,
        req.headers['user-agent']
      );
      const response = Object.assign({}, user, token);
      res.json(response);
    }
  }

  /**
   * @api {patch} /api/v1/auth/forgotPassword forgot password
   * @apiName forgotPassword
   * @apiGroup Auth
   *
   */
  async function forgotPassword(req, res) {
    const { email } = req.body;
    const response = await app.auth.forgotPassword(
      email,
      req.ip,
      req.headers['user-agent']
    );
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/auth/resetPassword reset password
   * @apiName resetPassword
   * @apiGroup Auth
   *
   */
  async function resetPassword(req, res, next) {
    const { token } = req.query;

    if (!token) {
      next(
        new Error400('Invalid reset! Did you really request a password reset?')
      );
    }

    const response = await app.auth.resetPassword(token, req.body.password);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/auth/confirmEmail  confirm user email
   * @apiName confirmEmail
   * @apiGroup Auth
   *
   */
  async function confirmEmail(req, res) {
    const { token } = req.query;
    const response = await app.auth.confirmEmail(token);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/auth/resendConfirmation  resend email confirmation token
   * @apiName resendConfirmation
   * @apiGroup Auth
   *
   */
  async function resendConfirmation(req, res) {
    const response = await app.auth.resendConfirmation({
      identity: req.query.identity,
      useragent: req.headers['user-agent'],
    });
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/auth/emailExist  checks if email already in use
   * @apiName emailExist
   * @apiGroup Auth
   *
   */
  async function emailExist(req, res) {
    const { email } = req.body;
    const response = await app.auth.emailExist(email);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/auth/identityExist  checks if email already in use
   * @apiName identityExist
   * @apiGroup Auth
   *
   */
  async function identityExist(req, res) {
    const { identity } = req.body;
    const response = await app.auth.identityExist(identity);
    res.json(response);
  }

  return Object.freeze({
    post: asyncMiddleware(post),
    login: asyncMiddleware(login),
    forgotPassword: asyncMiddleware(forgotPassword),
    resetPassword: asyncMiddleware(resetPassword),
    confirmEmail: asyncMiddleware(confirmEmail),
    resendConfirmation: asyncMiddleware(resendConfirmation),
    emailExist: asyncMiddleware(emailExist),
    identityExist: asyncMiddleware(identityExist),
  });
};
