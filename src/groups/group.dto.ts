import { ValidateNested, IsArray, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  roleIds: number[];
}
