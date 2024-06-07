import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Group } from './groups/group.entity';
import { Permission } from './permissions/permission.entity';
import { LiquibaseService } from './liquibase/liquibase.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rahul',
      password: 'wwe',
      database: 'rahul',
      entities: [User, Role, Group, Permission],
      synchronize: false,
    }),
    UsersModule,
    GroupsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LiquibaseService],
})
export class AppModule {}
