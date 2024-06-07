import { ValidateNested, IsArray, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({
    type: String,
    example: 'Group',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Description',
  })
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  roleIds: number[];
}
