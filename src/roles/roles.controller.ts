import {
  Controller,
  Post,
  Get,
  Delete,
  ParseIntPipe,
  Param,
  Body,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.rolesService.create(roleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }

  @Post(':roleId/permissions')
  async assignPermissionToRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    return await this.rolesService.assignPermissionToRole(
      roleId,
      permissionIds,
    );
  }
}
