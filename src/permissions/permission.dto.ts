import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}
