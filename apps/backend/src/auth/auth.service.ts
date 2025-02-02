import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Resend } from 'resend';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  private resend: Resend;

  constructor(
    private readonly dataservice: PrismaService,
    private readonly jwtservice: JwtService,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  // Generate Access Token
  private generateAccessToken(email: string): string {
    return this.jwtservice.sign(
      { email },
      {
        secret: process.env.JWT_SECRET, // Access token secret
        expiresIn: '1h', // Expires in 1 hour
      },
    );
  }

  // Generate Refresh Token
  private generateRefreshToken(email: string): string {
    return this.jwtservice.sign(
      { email },
      {
        secret: process.env.JWT_REFRESH_SECRET, // Refresh token secret
        expiresIn: '7d', // Expires in 7 days
      },
    );
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
  
    // Find user by email
    const user = await this.dataservice.user.findFirst({
      where: { email: email },
    });
  
    if (!user) {
      throw new NotFoundException('No user exists with the entered email');
    }
  
    console.log('Stored hashed password:', user.password); // Debugging log
    console.log('Entered password:', password); // Debugging log
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Entered hashed password:', hashedPassword);
    // Validate password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = (hashedPassword === user.password) ? true: false
    console.log('Password match result:', isPasswordValid); // Debugging log
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong Password'); // Changed exception type
    }
  
    // Generate tokens
    const token = this.generateAccessToken(email);
    const refreshtoken = this.generateRefreshToken(email);
  
    return { token, refreshtoken };
  }
  

  async register(registerData: RegisterUserDto) {
    // Check if user already exists
    const existingUser = await this.dataservice.user.findFirst({
      where: {
        email: registerData.email,
      },
    });

    if (existingUser) {
      throw new BadGatewayException('User with this email already exists');
    }

    // Hash password
    registerData.password = await bcrypt.hash(registerData.password, 10);

    // Create new user
    const newUser = await this.dataservice.user.create({ data: registerData });

    // Generate tokens
    const token = this.generateAccessToken(newUser.email);
    const refreshtoken = this.generateRefreshToken(newUser.email);

    return {
      token,
      refreshtoken,
    };
  }

  // Validate Refresh Token
  validateRefreshToken(refreshToken: string): any {
    try {
      return this.jwtservice.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e) {
      return null; // Invalid token
    }
  }

  async refreshToken(user: string) {
    const payload = user

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
  // Reset Password: Step 1 - Send Reset Email
  async sendResetPasswordEmail(email: string) {
    const user = await this.dataservice.user.findFirst({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    const resetToken = this.jwtservice.sign(
      { email },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    try {
      await this.resend.emails.send({
        from: 'noreply@riteekrakesh.tech',
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
      });

      return { message: 'Reset password email sent successfully' };
    } catch (error) {
      throw new BadGatewayException('Failed to send reset email');
    }
  }

  // Reset Password: Step 2 - Validate Token and Update Password
  async resetPassword(token: string, newPassword: string) {
    let decoded;
    try {
      decoded = this.jwtservice.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  
    const user = await this.dataservice.user.findFirst({ where: { email: decoded.email } });
  
    if (!user) throw new NotFoundException('User not found');
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('New hashed password:', hashedPassword); // Debugging log
  
    // Update password in the database
    await this.dataservice.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });
  
    // Verify that bcrypt.compare() works immediately
    const updatedUser = await this.dataservice.user.findFirst({ where: { email: decoded.email } });
    console.log('Stored password after update:', updatedUser?.password); // Debugging log
  
    const checkPassword = await bcrypt.compare(newPassword, updatedUser?.password || '');
    console.log('Password validation result:', checkPassword); // Debugging log
  
    if (!checkPassword) {
      throw new BadGatewayException('Password reset failed');
    }
  
    return { message: 'Password reset successfully' };
  }
}  