/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-12
 * */
import { CustomerService } from '../services/index.js';
import { Logger } from '../../utils/index.js';

export default class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }

  GetCustomer = (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, ID is required.' },
      });
    }

    this.customerService
      .Retrieve(id)
      .then((result) => {
        return res.status(result.status_code).json({ result });
      })
      .catch((CustomerError) => {
        CustomerError.data.error ? Logger.error(CustomerError.data.error) : '';
        return res.status(CustomerError.status_code).json({ ...CustomerError });
      });
  };

  EditContact = (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, ID is required.' },
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, nothing to update.' },
      });
    } else {
      this.customerService
        .EditContact(id, req.body)
        .then((result) => {
          return res.status(result.status_code).json({ result });
        })
        .catch((ContactError) => {
          ContactError.data.error ? Logger.error(ContactError.data.error) : '';
          return res.status(ContactError.status_code).json({ ...ContactError });
        });
    }
  };

  EditFullNames = (req, res) => {
    const id = req.params.id;
    const { full_names } = req.body;

    if (!id) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, ID is required.' },
      });
    }

    if (!full_names) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, nothing to update.' },
      });
    }

    this.customerService
      .EditFullnames(id, full_names)
      .then((result) => {
        return res.status(result.status_code).json({ result });
      })
      .catch((FullNamesError) => {
        FullNamesError.data.error
          ? Logger.error(FullNamesError.data.error)
          : '';
        return res
          .status(FullNamesError.status_code)
          .json({ ...FullNamesError });
      });
  };

  EditPassword = (req, res) => {
    const id = req.params.id;
    const { new_password, confirm_password } = req.body;

    if (!id) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, ID is required.' },
      });
    }

    if (!new_password || !confirm_password) {
      return res.status(400).json({
        status_code: 400,
        data: { message: 'Sorry, all fields are required.' },
      });
    }

    this.customerService
      .EditPassword(id, new_password, confirm_password)
      .then((result) => {
        return res.status(result.status_code).json({ result });
      })
      .catch((PasswordError) => {
        PasswordError.data.error ? Logger.error(PasswordError.data.error) : '';
        return res.status(PasswordError.status_code).json({ ...PasswordError });
      });
  };
}
