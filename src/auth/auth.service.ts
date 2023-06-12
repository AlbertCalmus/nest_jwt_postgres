import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto | undefined> {
    return this.usersService.create(registerDto);
  }

  async login(user: User): Promise<any> {
    const payload = {
      phoneNumber: user.phoneNumber,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(
    phoneNumber: string,
    password: string
  ): Promise<User | null> {
    const user = await this.usersService.findOne(phoneNumber);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  async getUserInfo(phoneNumber: string): Promise<UserDto> {
    const user = await this.usersService.findOne(phoneNumber);
    return new UserDto(user.id, user.phoneNumber);
  }
}
