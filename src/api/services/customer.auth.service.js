/**
 * @fileoverview -
 * @author: b3lf3g0r
 * @version: 1.0.0
 * @since: 2023-03-10
 * */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../configs/index.js';
import PasswordService from './password.service.js';
import { Token, Validator } from '../../utils/index.js';
import {
  AuthenticationHelper,
  CustomerHelper,
  UserHelper,
} from '../db/helpers/index.js';

export default class CustomerAuthService {
  constructor() {
    this.jwt_key = authConfig.jwt.authorization_key;
    this.tokenGenerator = new Token();
    this.validate = new Validator();

    this.authHelper = new AuthenticationHelper();
    this.customerHelper = new CustomerHelper();
    this.userHelper = new UserHelper();

    this.passwordService = new PasswordService();
  }

  /**
   * @description - Sign in customer
   * @param {string} username - username
   * @param {string} password - password
   *
   */
  SignIn = (username, password) =>
    new Promise((resolve, reject) => {
      // validate username
      this.validate
        .IsUsername(username)
        .then((valid_username) => {
          // fetch user account
          this.userHelper
            .AccountExist(valid_username)
            .then((account) => {
              if (account) {
                // compare password
                bcrypt.compare(
                  password,
                  account.password,
                  (err, password_match) => {
                    if (err) {
                      reject({
                        status_code: 500,
                        data: {
                          message: 'Sorry, failed to sign in.',
                          error: `[CustomerAuthService.SignIn] bcrypt.compare => ${err}`,
                        },
                      });
                    } else {
                      if (password_match) {
                        // retrieve access token
                        this.authHelper
                          .Retrieve(account._id)
                          .then((authentication) => {
                            if (authentication) {
                              // check if access token is still valid
                              jwt.verify(
                                authentication.accessToken,
                                this.jwt_key,
                                // eslint-disable-next-line no-unused-vars
                                (err, decoded) => {
                                  if (err) {
                                    // generate refresh token
                                    const refresh_token =
                                      this.tokenGenerator.AuthorizationToken(
                                        account.username,
                                        account._id,
                                        account.role
                                      );

                                    if (refresh_token) {
                                      // update db access token
                                      this.authHelper
                                        .Edit(account._id, {
                                          accessToken: refresh_token,
                                        })
                                        .then((updated_authentication) => {
                                          resolve({
                                            status_code: 200,
                                            data: {
                                              access_token:
                                                updated_authentication.accessToken,
                                            },
                                          });
                                        })
                                        .catch((RefreshTokenError) => {
                                          reject({
                                            data: {
                                              status_code: 500,
                                              data: {
                                                message:
                                                  'Sorry, failed to sign in.',
                                                error: `[CustomerAuthService.SignIn] authHelper.Edit => ${RefreshTokenError}`,
                                              },
                                            },
                                          });
                                        });
                                    } else {
                                      reject({
                                        status_code: 500,
                                        data: {
                                          message: 'Sorry, failed to sign in.',
                                        },
                                      });
                                    }
                                  } else {
                                    resolve({
                                      status_code: 200,
                                      data: {
                                        access_token:
                                          authentication.accessToken,
                                      },
                                    });
                                  }
                                }
                              );
                            } else {
                              reject({
                                status_code: 500,
                                data: { message: 'Sorry, failed to sign in.' },
                              });
                            }
                          })
                          .catch((AuthenticaionError) => {
                            reject({
                              status_code: 500,
                              data: {
                                message: 'Sorry, failed to sign in.',
                                error: `[CustomerAuthService.SignIn] authHelper.Retrieve => ${AuthenticaionError}`,
                              },
                            });
                          });
                      } else {
                        reject({
                          status: 401,
                          data: { message: 'Invalid username or password.' },
                        });
                      }
                    }
                  }
                );
              } else {
                reject({
                  status: 401,
                  data: { message: 'Invalid username or password.' },
                });
              }
            })
            .catch((AccountError) => {
              reject({
                status_code: 500,
                data: {
                  data: { message: 'Sorry, failed to sign in.' },
                  error: `[CustomerAuthService.SignIn] userHelper.AccountExist => ${AccountError}`,
                },
              });
            });
        })
        .catch((UsernameError) => {
          reject({
            status_code: 400,
            data: { message: `${UsernameError}` },
          });
        });
    });

  SignUp = (full_names, username, password, confirm_password) =>
    new Promise((resolve, reject) => {
      // validate username
      this.validate
        .IsUsername(username)
        .then((valid_username) => {
          // validate passwords
          this.validate
            .IsPassword(password, confirm_password)
            .then((valid_password) => {
              // check if account exist
              this.userHelper
                .AccountExist(valid_username)
                .then((account) => {
                  if (account) {
                    reject({
                      status_code: 400,
                      data: {
                        message: 'Sorry, username already exist.',
                      },
                    });
                  } else {
                    // hash password
                    bcrypt.hash(valid_password, 12, (err, hashed_password) => {
                      if (err) {
                        reject({
                          status_code: 500,
                          data: {
                            message: 'Sorry, failed to register.',
                            error: `[CustomerAuthService.SignUp] bcrypt.hash => ${err}`,
                          },
                        });
                      } else {
                        // save user
                        this.userHelper
                          .Save(valid_username, hashed_password)
                          .then((user) => {
                            // save customer
                            this.customerHelper
                              .Save(full_names, user._id)
                              .then((customer) => {
                                // generate access token and save
                                const access_token =
                                  this.tokenGenerator.AuthorizationToken(
                                    user.username,
                                    user._id,
                                    user.role
                                  );

                                this.authHelper
                                  .Save(user._id, access_token)
                                  .then((authentication) => {
                                    resolve({
                                      status_code: 201,
                                      data: {
                                        access_token:
                                          authentication.accessToken,
                                      },
                                    });
                                  })
                                  .catch((AuthenticationError) => {
                                    // delete user and customer
                                    this.userHelper
                                      .Delete(user._id)
                                      .then(() => {
                                        this.customerHelper
                                          .Delete(customer._id)
                                          .then(() => {
                                            reject({
                                              status_code: 500,

                                              data: {
                                                message:
                                                  'Sorry, failed to register.',
                                                error: `[CustomerAuthService.SignUp] authHelper.Save => ${AuthenticationError}`,
                                              },
                                            });
                                          })
                                          .catch((CustomerError) => {
                                            reject({
                                              status_code: 500,
                                              data: {
                                                message:
                                                  'Sorry, failed to register.',
                                                error: `[CustomerAuthService.SignUp][customerHelper.Save] customerHelper.Delete => ${CustomerError}`,
                                              },
                                            });
                                          });
                                      })
                                      .catch((UserError) => {
                                        reject({
                                          status_code: 500,
                                          data: {
                                            message:
                                              'Sorry, failed to register.',
                                            error: `[CustomerAuthService.SignUp][customerHelper.Save] userHelper.Delete => ${UserError}`,
                                          },
                                        });
                                      });
                                  });
                              })
                              .catch((CustomerError) => {
                                // delete user
                                this.userHelper
                                  .Delete(user._id)
                                  .then(() => {
                                    reject({
                                      status_code: 500,
                                      data: {
                                        message: 'Sorry, failed to register.',
                                        error: `[CustomerAuthService.SignUp][customerHelper.Save] customerHelper.Save => ${CustomerError}`,
                                      },
                                    });
                                  })
                                  .catch((UserError) => {
                                    reject({
                                      status_code: 500,
                                      data: {
                                        message: 'Sorry, failed to register.',
                                        error: `[CustomerAuthService.SignUp][customerHelper.Save] userHelper.Delete => ${UserError}`,
                                      },
                                    });
                                  });
                              });
                          })
                          .catch((UserError) => {
                            reject({
                              status_code: 500,
                              data: {
                                message: 'Sorry, failed to register.',
                                error: `[CustomerAuthService.SignUp][userHelper.Save] userHelper.Save => ${UserError}`,
                              },
                            });
                          });
                      }
                    });
                  }
                })
                .catch((AccountError) => {
                  reject({
                    status_code: 500,
                    data: {
                      message: 'Sorry, failed to register.',
                      error: `[CustomerAuthService.SignUp] userHelper.AccountExist => ${AccountError}`,
                    },
                  });
                });
            })
            .catch((PasswordError) => {
              reject({
                status_code: 400,
                data: { message: PasswordError },
              });
            });
        })
        .catch((UsernameError) => {
          reject({
            status_code: 400,
            data: { message: UsernameError },
          });
        });
    });

  ForgotPassword = (username) =>
    new Promise((resolve, reject) => {
      // validate username
      this.validate
        .IsUsername(username)
        .then((valid_username) => {
          // check if account exist
          this.userHelper
            .AccountExist(valid_username)
            .then((account) => {
              if (account) {
                // fetch customer
                this.customerHelper
                  .Retrieve(account._id)
                  .then((customer) => {
                    if (!customer) {
                      reject({
                        status_code: 500,
                        data: {
                          message: 'Sorry, failed to send email.',
                        },
                      });
                    } else {
                      // generate password token
                      // TODO: save token to db and after password has been updated delete from db
                      const password_token = this.tokenGenerator.PasswordToken(
                        account.username
                      );

                      this.passwordService
                        .PasswordReset(
                          customer.fullNames,
                          account.username,
                          password_token
                        )
                        .then((res) => {
                          resolve({
                            message: res,
                            status_code: 201,
                          });
                        })
                        .catch((ResetError) => {
                          reject({
                            status_code: 500,
                            data: {
                              message: 'Sorry, failed to send email.',
                              error: `[CustomerAuthService.ForgotPassword] passwordService.PasswordRese => ${ResetError}`,
                            },
                          });
                        });
                    }
                  })
                  .catch((CustomerError) => {
                    reject({
                      status_code: 500,
                      data: {
                        message: 'Sorry, failed to send email.',
                        error: `[CustomerAuthService.ForgotPassword] customerHelper.Retrieve => ${CustomerError}`,
                      },
                    });
                  });
              } else {
                reject({
                  status_code: 404,
                  data: { message: 'Sorry, account not found.' },
                });
              }
            })
            .catch((AccountError) => {
              reject({
                status_code: 500,
                data: {
                  message: 'Sorry, failed to send email.',
                  error: `[CustomerAuthService.ForgotPassword] userHelper.AccountExist => ${AccountError}`,
                },
              });
            });
        })
        .catch((UsernameError) => {
          reject({
            status_code: 400,
            data: { message: UsernameError },
          });
        });
    });
}
