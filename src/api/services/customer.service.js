/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-11
 * */
import bcrypt from 'bcrypt';
import { Validator } from '../../utils/index.js';
import { CustomerHelper, UserHelper } from '../db/helpers/index.js';

export default class Edit {
  constructor() {
    this.customerHelper = new CustomerHelper();
    this.userHelper = new UserHelper();

    this.validate = new Validator();
  }

  /**
   * @description - Fetch customer info
   * @param {string} id - user id
   * @example - Retrieve('5f5f5f5f5f5f5f5f5f5f5f5f')
   * @returns {Promise} - customer info
   */
  Retrieve = (id) =>
    new Promise((resolve, reject) => {
      // fetch user
      this.userHelper
        .Retrieve(id)
        .then((user) => {
          // check if user exist
          if (!user) {
            reject({
              status_code: 500,
              data: {
                message: 'Sorry, failed to retrieve account info.',
              },
            });
          }

          // fetch customer
          this.customerHelper
            .Retrieve(user._id)
            .then((customer) => {
              // check if customer exist
              if (!customer) {
                reject({
                  status_code: 500,
                  data: {
                    message: 'Sorry, failed to retrieve account info.',
                  },
                });
              }

              // eslint-disable-next-line no-unused-vars
              const { _id, password, ...user_others } = user._doc;
              // eslint-disable-next-line no-unused-vars
              const { __v, ...customer_others } = customer._doc;

              resolve({
                status_code: 200,
                data: {
                  customer: { ...customer_others, ...user_others },
                },
              });
            })
            .catch((CustomerError) => {
              reject({
                status_code: 500,
                data: {
                  message: 'Sorry, failed to retrieve account info.',
                  error: `[CustomerService.Retrieve] customerHelper.Retrieve => ${CustomerError}`,
                },
              });
            });
        })
        .catch((UserError) => {
          reject({
            status_code: 500,
            data: {
              message: 'Sorry, failed to retrieve account info.',
              error: `[CustomerService.Retrieve] userHelper.Retrieve => ${UserError}`,
            },
          });
        });
    });

  /**
   * @description - Edit customer contact details
   * @param {string} id - user id
   * @param {object} contact - new contact details
   * @example - EditContact('5f5f5f5f5f5f5f5f5f5f5f5f', { username: 'john.doe@gmail.com', mobile: '0712345678' })
   * @returns {Promise} - customer info
   * */
  EditContact = (id, contact) =>
    new Promise((resolve, reject) => {
      if (Object.keys(contact).length === 2) {
        // validate username
        this.validate
          .IsUsername(contact.username)
          .then((valid_username) => {
            // validate mobile
            this.validate
              .IsMobile(contact.mobile)
              .then((valid_mobile) => {
                this.userHelper
                  .Edit(id, {
                    username: valid_username,
                    mobile: valid_mobile,
                  })
                  .then((user) => {
                    resolve({
                      status_code: 201,
                      data: {
                        customer: user._doc,
                      },
                    });
                  })
                  .catch((EditError) => {
                    reject({
                      status_code: 500,
                      data: {
                        message: 'Sorry, failed to update contact info.',
                        error: `[CustomerService.EditContact][username][mobile] userHelper.Edit => ${EditError}`,
                      },
                    });
                  });
              })
              .catch((MobileError) => {
                reject({
                  status_code: 400,
                  data: {
                    message: `${MobileError}`,
                  },
                });
              });
          })
          .catch((UsernameError) => {
            reject({
              status_code: 400,
              data: {
                message: `${UsernameError}`,
              },
            });
          });
      } else if (Object.keys(contact)[0] === 'username') {
        //validate username
        this.validate
          .IsUsername(contact.username)
          .then((valid_username) => {
            this.userHelper
              .Edit(id, { username: valid_username })
              .then((user) => {
                resolve({
                  status_code: 201,
                  data: {
                    customer: user._doc,
                  },
                });
              })
              .catch((EditError) => {
                reject({
                  status_code: 500,
                  data: {
                    message: 'Sorry, failed to update username.',
                    error: `[CustomerService.EditContact][username] userHelper.Edit => ${EditError}`,
                  },
                });
              });
          })
          .catch((UsernameError) => {
            reject({
              status_code: 400,
              data: {
                message: `${UsernameError}`,
              },
            });
          });
      } else {
        // validate mobile
        this.validate
          .IsMobile(contact.mobile)
          .then((valid_mobile) => {
            this.userHelper
              .Edit(id, { mobile: valid_mobile })
              .then((user) => {
                resolve({
                  status_code: 201,
                  data: {
                    customer: user._doc,
                  },
                });
              })
              .catch((EditError) => {
                reject({
                  status_code: 500,
                  data: {
                    message: 'Sorry, failed to update mobile.',
                    error: `[CustomerService.EditContact][mobile] userHelper.Edit => ${EditError}`,
                  },
                });
              });
          })
          .catch((MobileError) => {
            reject({
              status_code: 400,
              data: {
                message: `${MobileError}`,
              },
            });
          });
      }
    });

  /**
   * @description - Edit customer full names
   * @param {string} id - user id
   * @param {string} full_names - new full names
   * @example - EditFullnames('5f5f5f5f5f5f5f5f5f5f5f5f', 'John Doe')
   * @returns {Promise} - updated customer info
   */
  EditFullnames = (id, full_names) =>
    new Promise((resolve, reject) => {
      this.customerHelper
        .Retrieve(id)
        .then((customer) => {
          if (!customer) {
            reject({
              status_code: 500,
              data: {
                message: 'Sorry, failed to update full names.',
              },
            });
          }

          // update fullnames
          this.customerHelper
            .Edit(id, { full_names })
            .then((updated_customer) => {
              resolve({
                status_code: 201,
                data: {
                  customer: updated_customer._doc,
                },
              });
            })
            .catch((FullNamesError) => {
              reject({
                status_code: 500,
                data: {
                  message: 'Sorry, failed to update full names.',
                  error: `[CustomerService.EditFullnames] customerHelper.Edit => ${FullNamesError}`,
                },
              });
            });
        })
        .catch((CustomerError) => {
          reject({
            status_code: 500,
            data: {
              message: 'Sorry, failed to update full names.',
              error: `[CustomerService.EditFullnames] customerHelper.Retrieve => ${CustomerError}`,
            },
          });
        });
    });

  /**
   * @description - Edit customer password
   * @param {string} id - user id
   * @param {string} password - new password
   * @param {string} confirm_password - confirm new password
   * @example - EditPassword('5f5f5f5f5f5f5f5f5f5f5f5f', 'password', 'password')
   * @returns {Promise} - updated customer info
   */
  EditPassword = (id, password, confirm_password) =>
    new Promise((resolve, reject) => {
      // validate passwords
      this.validate
        .IsPassword(password, confirm_password)
        .then((valid_password) => {
          this.userHelper
            .Retrieve(id)
            .then((user) => {
              if (!user) {
                reject({
                  status_code: 500,
                  data: {
                    message: 'Sorry, failed to update password.',
                  },
                });
              }

              // check if new password is not save as old password_match
              bcrypt.compare(
                valid_password,
                user.password,
                (err, passwords_match) => {
                  if (err) {
                    reject({
                      status_code: 500,
                      data: {
                        message: 'Sorry, failed to update password.',
                        error: `[CustomerService.EditPassword] bcrypt.compare => ${err}`,
                      },
                    });
                  } else {
                    if (passwords_match) {
                      reject({
                        status_code: 400,
                        data: {
                          message:
                            'Sorry, new password cant be same as old one.',
                        },
                      });
                    }

                    // hash password
                    bcrypt.hash(valid_password, 12, (err, hashed_password) => {
                      if (err) {
                        reject({
                          status_code: 500,
                          data: {
                            message: 'Sorry, failed to update password.',
                            error: `[CustomerService.EditPassword] bcrypt.hash => ${err}`,
                          },
                        });
                      }

                      // update password
                      this.userHelper
                        .Edit(user._id, { password: hashed_password })
                        .then(() => {
                          resolve({
                            status_code: 201,
                            data: {
                              message: 'Password updated successfully.',
                            },
                          });
                        })
                        .catch((EditError) => {
                          reject({
                            status_code: 500,
                            data: {
                              message: 'Sorry, failed to update password.',
                              error: `[CustomerService.EditPassword] userHelper.Edit => ${EditError}`,
                            },
                          });
                        });
                    });
                  }
                }
              );
            })
            .catch((RetrieveError) => {
              reject({
                status_code: 500,
                data: {
                  message: 'Sorry, failed to update password.',
                  error: `[CustomerService.EditPassword] userHelper.Retrieve => ${RetrieveError}`,
                },
              });
            });
        })
        .catch((PasswordError) => {
          reject({
            status_code: 400,
            data: { message: `${PasswordError}` },
          });
        });
    });
}
