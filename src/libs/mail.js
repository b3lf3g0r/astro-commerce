/**
 * @fileoverview
 * @author b3lf3g0r
 * @version 1.0.0
 * @since 2023-03-10
 * */
import nodemailer from 'nodemailer';
import mailGen from 'mailgen';
import { mailConfig } from '../configs/index.js';

export const mail = {
  mailGen() {
    return new mailGen({
      theme: mailConfig.mailgen.theme,
      product: {
        name: mailConfig.mailgen.product.name,
        link: mailConfig.mailgen.product.link,
        logo: mailConfig.mailgen.product.logo,
        copyright: mailConfig.mailgen.product.copyright,
      },
    });
  },
  transporter() {
    return nodemailer.createTransport({
      service: mailConfig.nodemailer.service,
      host: mailConfig.nodemailer.host,
      port: mailConfig.nodemailer.port,
      secure: mailConfig.nodemailer.secure,
      auth: {
        user: mailConfig.nodemailer.auth.user,
        pass: mailConfig.nodemailer.auth.pass,
      },
    });
  },
};
