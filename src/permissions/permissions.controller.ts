import {
  Controller,
  Post,
  Get,
  Delete,
  ParseIntPipe,
  Param,
  Body,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @Post()
  create(@Body() permissionDto: PermissionDto) {
    return this.permissionsService.create(permissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.delete(id);
  }
}
