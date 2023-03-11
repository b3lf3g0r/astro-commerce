/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import User from '../schemas/user.schema.js';

export default class UserHelper {
  constructor() {
    this.Model = User;
  }

  /**
   * @method Save
   * @description save new user to database
   * @param {String} username - user email address
   * @param {String} password  - user hashed password
   * @example Save('john.doe@gmail.com', 'hashed-password')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Save = (username, password) =>
    new Promise((resolve, reject) => {
      new this.Model({
        username,
        password,
      })
        .save()
        .then((user) => {
          resolve(user);
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
        _id: {
          $eq: id,
        },
      })
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method AccountExist
   * @description search for user account
   * @param {String} username - user valid username
   * @example AccountExist('john.doe@gmail.com')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  AccountExist = (username) =>
    new Promise((resolve, reject) => {
      this.Model.findOne({
        username: {
          $eq: username,
        },
      })
        .then((user) => {
          resolve(user);
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
   * @example Edit('f5f5f5f5f5f5f5f5f5', {username: 'john.doe@gmail.com', password: 'new-8347hased3489-pass'})
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Edit = (id, data) =>
    new Promise((resolve, reject) => {
      this.Model.findOneAndUpdate(
        {
          _id: {
            $eq: id,
          },
        },
        {
          $set: {
            username: data.username,
            password: data.password,
          },
        },
        {
          new: true,
        }
      )
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method Delete
   * @description remove user document from database using id
   * @param {String} id - user ID
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
