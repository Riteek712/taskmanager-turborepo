import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshJwtGuard } from './refresh.guard';
import { ResetPassword, ResetPasswordNext } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  @ApiOperation({ description:'To register a new user with email.', summary: 'Register a User with details.' })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  @ApiOperation({ description:'Login with email.', summary: 'Endpoint to login with user email and password.' })
  login(@Body() loginData: LoginDto){
    return this.authService.login(loginData)
  }
  @Post('reset-password')
  @ApiOperation({ description:'Send Reset password via email.', summary: 'Endpoint to reset password email.' })
  resetPassword(@Body() reset: ResetPassword){
    return this.authService.sendResetPasswordEmail(reset.email)
  }
  @Post('reset-password-next')
  @ApiOperation({ description:'Use Reset password token to set password.', summary: 'step 2 to setup new password.' })
  resetPasswordStep2(@Body() resetNext: ResetPasswordNext){
    return this.authService.resetPassword(resetNext.token, resetNext.newPassword);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }


  
}
