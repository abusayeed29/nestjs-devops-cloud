import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/common/mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  //   Register a new user
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          password: false,
        },
      });

      const tokens = await this.generateTokens(user.id, user.email);

      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        ...tokens,
        user,
      };
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new InternalServerErrorException(
        'An error occurred during registration',
      );
    }
  }

  // Generate access and refresh tokens
  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };
    const refreshId = randomBytes(16).toString('hex');
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      this.jwtService.signAsync(
        { ...payload, refreshId },
        {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  // Update refresh token in the database
  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  // Refresh access token
  async refreshTokens(userId: string): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  // Log out
  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  // Forgot password — generate token and send email
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpiry: expiry,
      },
    });

    await this.mailService.sendPasswordResetEmail(user.email, token);

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  // Reset password — validate token and update password
  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: dto.token,
        passwordResetExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, this.SALT_ROUNDS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
        refreshToken: null, // invalidate all sessions
      },
    });

    return { message: 'Password reset successfully. You can now log in.' };
  }

  // Login
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
