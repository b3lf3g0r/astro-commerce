/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-12
 * */
import express from 'express';
import CustomerController from '../controllers/customer.controller.js';

export default class CustomerRoutes {
  constructor() {
    this.customer = new CustomerController();
    this.router = express.Router();
  }

  init = () =>
    this.router
      .get('/:id', this.GetCustomer.bind(this))
      .put('/:id', this.EditFullNames.bind(this))
      .put('/:id/contact', this.EditContact.bind(this))
      .put('/:id/password', this.EditPassword.bind(this));

  GetCustomer = (req, res, next) => this.customer.GetCustomer(req, res, next);

  EditFullNames = (req, res, next) =>
    this.customer.EditFullNames(req, res, next);

  EditContact = (req, res, next) => this.customer.EditContact(req, res, next);

  EditPassword = (req, res, next) => this.customer.EditPassword(req, res, next);
}
