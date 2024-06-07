import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    type: String,
    example: 'Role',
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

  @ApiProperty({
    type: Number,
    example: '1',
  })
  groupId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Number)
  permissionIds: number[];
}
