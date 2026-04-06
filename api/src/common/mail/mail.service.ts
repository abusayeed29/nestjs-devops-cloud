import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('EMAIL_USER'),
        clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;
    const from = this.configService.get<string>('EMAIL_USER');

    try {
      await this.transporter.sendMail({
        from: `"StoreFront" <${from}>`,
        to,
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #111; margin-bottom: 8px;">Reset Your Password</h2>
            <p style="color: #555; margin-bottom: 24px;">
              We received a request to reset your password. Click the button below to choose a new one.
              This link expires in <strong>1 hour</strong>.
            </p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 28px; background: #111; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Reset Password
            </a>
            <p style="color: #999; font-size: 13px; margin-top: 24px;">
              If you didn't request this, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #bbb; font-size: 12px;">
              Or copy this link: <a href="${resetUrl}" style="color: #555;">${resetUrl}</a>
            </p>
          </div>
        `,
      });
      this.logger.log(`Password reset email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${to}`, error);
      throw error;
    }
  }
}
