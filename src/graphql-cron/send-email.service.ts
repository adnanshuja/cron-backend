import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import  Constants from '../constants';
 
@Injectable()
export class SendEmailService {
  private nodemailerTransport: Mail;
 
  constructor() {
    this.nodemailerTransport = createTransport({
      service: Constants.EMAIL_SERVICE,
      auth: {
        user: Constants.EMAIL_USER,
        pass: Constants.EMAIL_PASSWORD,
      }
    });
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}