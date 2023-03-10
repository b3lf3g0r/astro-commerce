/* eslint-disable no-undef */
/**
 * @fileoverview -
 * @author: afridek
 * @version: 1.0.0
 * @since: 2023-02-15
 */
import chai from 'chai';

import Validator from '../../src/utils/validator.js';

const validator = new Validator();

const expect = chai.expect;

describe('Validator Services', () => {
  test('should return valid email address', () => {
    const username = 'john.doe@gmail.com';

    validator.IsUsername(username).then((res) => {
      expect(res).to.be.eql(username);
    });
  });

  test('should return valid mobile number', () => {
    const mobile = '27761234567';

    validator.IsMobile(mobile).then((res) => {
      expect(res).to.be.eql(mobile);
    });
  });

  test('should return valid password', () => {
    const password = 'tesT123/_';
    const confirm_password = 'tesT123/_';

    validator.IsPassword(password, confirm_password).then((res) => {
      expect(res).to.be.eql(confirm_password);
    });
  });
});
