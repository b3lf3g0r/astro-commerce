/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-11
 * */
import { CustomerAuthService } from '../services/index.js';
import { Logger } from '../../utils/index.js';

export default class CustomerAuthController {
  constructor() {
    this.authService = new CustomerAuthService();
  }

  SignIn = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, all fields are required.' },
      });
    }

    this.authService
      .SignIn(username, password)
      .then((result) => {
        return res.status(result.status_code).json({
          result,
        });
      })
      .catch((SignInError) => {
        SignInError.data.error ? Logger.error(SignInError.data.error) : '';
        return res.status(Error.status_code).json({
          ...Error,
        });
      });
  };

  SignUp = (req, res) => {
    const { full_names, username, password, confirm_password } = req.body;

    if (!full_names || !username || !password || !confirm_password) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, all fields are required.' },
      });
    }

    this.authService
      .SignUp(full_names, username, password, confirm_password)
      .then((result) => {
        return res.status(result.status_code).json({ result });
      })
      .catch((SignUpError) => {
        SignUpError.data.error ? Logger.error(SignUpError.data.error) : '';
        return res.status(SignUpError.status_code).json({ ...SignUpError });
      });
  };

  ForgotPassword = (req, res) => {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, username is required.' },
      });
    }

    this.authService
      .ForgotPassword(username)
      .then((result) => {
        return res.status(result.status_code).json(result);
      })
      .catch((ForgotPasswordError) => {
        ForgotPasswordError.data.error
          ? Logger.error(ForgotPasswordError.data.error)
          : '';
        return res
          .status(ForgotPasswordError.status_code)
          .json({ ...ForgotPasswordError });
      });
  };
}
