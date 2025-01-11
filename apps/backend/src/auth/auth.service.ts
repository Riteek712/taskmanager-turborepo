import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import {LoginDto} from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: PrismaService,
    private readonly jwtservice: JwtService
  ){}

  async login(loginData: LoginDto){
    const {email, password} = loginData;
    const user = await this.dataservice.user.findFirst({
      where:{
        email: email
      }
    })
    if(!user){
      throw new NotFoundException("No user exists with the entered email")
    }
    console.log(user)
    const validatePassword = await bcrypt.compare(password, user.password)
    if(!validatePassword){
      throw new NotFoundException("Wrong Password")
    }

    console.log(this.jwtservice.sign({email}))
    return {
      token: this.jwtservice.sign({email})
    }

  }

  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where:{
        email: registerData.email
      }
    })
    if(user){
      throw new BadGatewayException('User with this email already exists')
    }
    registerData.password = await bcrypt.hash(registerData.password, 10)
    const res = await this.dataservice.user.create({data: registerData})
    return res;
  }

  
}
