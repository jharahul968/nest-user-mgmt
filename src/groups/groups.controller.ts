import {
  Controller,
  Post,
  Get,
  Delete,
  ParseIntPipe,
  Param,
  Body,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDto } from './group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Post()
  create(@Body() groupDto: GroupDto) {
    return this.groupsService.create(groupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.delete(id);
  }

  @Post(':groupId/users')
  async assignUserToGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body('userIds') userIds: number[],
  ) {
    return await this.groupsService.assignUserToGroup(groupId, userIds);
  }

  @Delete(':groupId/users/:userId')
  async removeUserFromGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.groupsService.removeUserFromGroup(groupId, userId);
  }

  @Post(':groupId/roles')
  async assignRoleToGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body('roleIds') roleIds: number[],
  ) {
    return await this.groupsService.assignRoleToGroup(groupId, roleIds);
  }

  @Delete(':groupId/roles/:roleId')
  async removeRoleFromGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<void> {
    await this.groupsService.removeRoleFromGroup(groupId, roleId);
  }
}
