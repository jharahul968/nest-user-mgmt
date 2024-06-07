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
}
