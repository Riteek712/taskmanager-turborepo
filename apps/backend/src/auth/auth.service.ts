import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: PrismaService,
    private readonly jwtservice: JwtService,
  ) {}

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
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('No user exists with the entered email');
    }

    console.log(user)

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Wrong Password');
    }

    // Generate tokens
    const token = this.generateAccessToken(email);
    const refreshtoken = this.generateRefreshToken(email);

    return {
      token,
      refreshtoken,
    };
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
}
