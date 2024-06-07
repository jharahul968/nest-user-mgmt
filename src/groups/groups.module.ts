import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
@Module({
  imports: [TypeOrmModule.forFeature([Group]), UsersModule, RolesModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
