import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  sendMail(email: string, emailToken: string): void {
    this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('SMTP_USER'),
      subject: 'Confirmation email from nest-practice ✔',
      html: `<p>Hello, please click on the following link to confirm your email: 
      <a href="${this.configService.get<string>(
        'CLIENT_URL'
      )}/auth/verify-email?emailToken=${emailToken}">Confirm email
      </a></p> `,
    });
  }
}
