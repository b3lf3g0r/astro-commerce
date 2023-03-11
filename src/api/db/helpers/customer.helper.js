/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import Customer from '../schemas/customer.schema.js';

export default class CustomerHelper {
  constructor() {
    this.Model = Customer;
  }

  /**
   * @method Save
   * @description save new customer to database
   * @param {String} full_names -  customer first and last names
   * @param {String} user - user ID
   * @example - save('John Doe', 'f5f5f5f5f5f5f5f5f5')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Save = (full_names, id) =>
    new Promise((resolve, reject) => {
      new this.Model({
        fullNames: full_names,
        user: id,
      })
        .save()
        .then((customer) => {
          resolve(customer);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method Retrieve
   * @description search for user in database using ID
   * @param {String} id - user ID
   * @example Retrieve('f5f5f5f5f5f5f5f5f5')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Retrieve = (id) =>
    new Promise((resolve, reject) => {
      this.Model.findOne({
        user: {
          $eq: id,
        },
      })
        .then((customer) => {
          resolve(customer);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method Edit
   * @description edit user document using ID
   * @param {String} id - user ID
   * @param {Object} data - user data to update
   * @example Edit('f5f5f5f5f5f5f5f5f5', {firstName: 'John', lastName: 'Doe'})
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Edit = (id, data) =>
    new Promise((resolve, reject) => {
      this.Model.findOneAndUpdate(
        {
          user: {
            $eq: id,
          },
        },
        {
          $set: {
            fullNames: data.full_names,
            billingAddress: data.billing_address,
            shippingAddress: data.shipping_address,
          },
        },
        {
          new: true,
        }
      )
        .then((customer) => {
          resolve(customer);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method Delete
   * @description remove user document from database using id
   * @param {String} id - customer ID
   * @example Delete('f5f5f5f5f5f5f5f5f5')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Delete = (id) =>
    new Promise((resolve, reject) => {
      this.Model.findOneAndRemove({
        _id: {
          $eq: id,
        },
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
}
