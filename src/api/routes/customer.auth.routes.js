/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-11
 * */
import express from 'express';
import CustomerAuthController from '../controllers/customer.auth.js';

export default class CustomerAuthRoutes {
  constructor() {
    this.auth = new CustomerAuthController();
    this.router = express.Router();
  }

  init = () =>
    this.router
      .post('/sign-in', this.SignIn.bind(this))
      .post('/sign-up', this.SignUp.bind(this))
      .post('/forgot-password', this.ForgotPassword.bind(this));

  SignIn = (req, res, next) => this.auth.SignIn(req, res, next);

  SignUp = (req, res, next) => this.auth.SignUp(req, res, next);

  ForgotPassword = (req, res, next) => this.auth.ForgotPassword(req, res, next);
}
