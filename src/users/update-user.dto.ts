import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'Rahul',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    type: String,
    example: 'rahul@rahul.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    example: 'Password',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  passwordHash?: string;
}
