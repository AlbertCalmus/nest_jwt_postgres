import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(phoneNumber: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        phoneNumber
      }
    });
  }

  async create(registerDto: RegisterDto): Promise<any | undefined> {
    return this.prisma.user.create({
      data: {
        phoneNumber: registerDto.phoneNumber,
        password: bcrypt.hashSync(registerDto.password, 12)
      },
      select: {
        id: true,
        phoneNumber: true
      }
    });
  }
}
