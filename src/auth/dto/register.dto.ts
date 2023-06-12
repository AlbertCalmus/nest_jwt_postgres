import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Matches } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsPhoneNumber()
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/, {
    message: 'Password is too weak'
  })
  password: string;
}
