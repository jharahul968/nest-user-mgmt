import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionDto {
  @ApiProperty({
    type: String,
    example: 'Permission',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Description',
  })
  @IsString()
  description: string;
}
