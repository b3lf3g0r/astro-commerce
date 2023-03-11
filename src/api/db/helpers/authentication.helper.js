/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import Authentication from '../schemas/authentication.schema.js';

export default class AuthenticationHelper {
  constructor() {
    this.Model = Authentication;
  }

  /**
   * @method Save
   * @description save new authentication to database
   * @param {String} user - user id
   * @param {String} token - jwt token
   * @example save('f5f5f5f5f5f5f5f5f5', 'access-token')
   * @return {Promise} - A promise that resolve to a string message or reject with an error.
   */
  Save = (user, token) =>
    new Promise((resolve, reject) => {
      new this.Model({
        user,
        accessToken: token,
      })
        .save()
        .then((authentication) => {
          resolve(authentication);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method retrieve
   * @description search for authentication in database using ID
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
        .then((authentication) => {
          resolve(authentication);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method edit
   * @description edit authentication document using ID
   * @param {String} id - authentication ID
   * @param {Object} otp - otp data to update
   * @example edit('f5f5f5f5f5f5f5f5f5', {token: '', code: 124, expire: 'jwt-token'})
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
            accessToken: data.token,
            otp: data.otp,
          },
        },
        {
          new: true,
        }
      )
        .then((authentication) => {
          resolve(authentication);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });

  /**
   * @method delete
   * @description remove authentication from database using id
   * @param {String} id - authentication ID
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
