import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface InvoiceLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface InvoiceEmailPayload {
  to: string;
  customerName: string;
  orderNumber: string;
  orderDate: Date;
  paymentMethod: string;
  transactionId: string;
  shippingAddress?: string | null;
  totalAmount: number;
  currency: string;
  items: InvoiceLineItem[];
}

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailAppPassword =
      this.configService.get<string>('EMAIL_APP_PASSWORD');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: emailAppPassword
        ? {
            user: emailUser,
            pass: emailAppPassword,
          }
        : {
            type: 'OAuth2',
            user: emailUser,
            clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
            refreshToken: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
          },
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.transporter.verify();
      this.logger.log('Mail transporter is ready');
    } catch (error) {
      this.logger.error(
        'Mail transporter verification failed. Check Gmail credentials in .env',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;
    const from = this.configService.get<string>('EMAIL_USER');

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
        </div>
      `,
    });
  }

  async sendInvoiceEmail(payload: InvoiceEmailPayload): Promise<void> {
    const from = this.configService.get<string>('EMAIL_USER');
    const formattedDate = payload.orderDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: payload.currency.toUpperCase(),
    });

    const itemsHtml = payload.items
      .map(
        (item) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #111;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #555; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #555; text-align: right;">${currencyFormatter.format(item.unitPrice)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #111; text-align: right; font-weight: 600;">${currencyFormatter.format(item.subtotal)}</td>
          </tr>
        `,
      )
      .join('');

    await this.transporter.sendMail({
      from: `"StoreFront" <${from}>`,
      to: payload.to,
      subject: `Invoice for Order ${payload.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 32px; background: #f9fafb; color: #111827;">
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="padding: 24px 28px; background: #111827; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Payment Successful</h1>
              <p style="margin: 8px 0 0; color: #d1d5db;">Thanks for your order, ${payload.customerName || 'Customer'}.</p>
            </div>
            <div style="padding: 28px;">
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #6b7280;">Order Number</p>
                <p style="margin: 0; font-size: 18px; font-weight: 700;">${payload.orderNumber}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Order Date</td>
                  <td style="padding: 8px 0; color: #111; text-align: right;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Payment Method</td>
                  <td style="padding: 8px 0; color: #111; text-align: right;">${payload.paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Transaction ID</td>
                  <td style="padding: 8px 0; color: #111; text-align: right;">${payload.transactionId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Shipping Address</td>
                  <td style="padding: 8px 0; color: #111; text-align: right;">${payload.shippingAddress || 'N/A'}</td>
                </tr>
              </table>

              <h2 style="font-size: 18px; margin: 0 0 12px;">Order Summary</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">Item</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; color: #6b7280; text-transform: uppercase;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase;">Unit Price</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>

              <div style="display: flex; justify-content: flex-end;">
                <div style="min-width: 240px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
                  <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 700;">
                    <span>Total</span>
                    <span>${currencyFormatter.format(payload.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    });
  }
}
