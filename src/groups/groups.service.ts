import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupDto } from './group.dto';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/role.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(groupDto: GroupDto): Promise<Group> {
    const group = this.groupRepository.create(groupDto);
    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`group with id ${id} not found.`);
    }
    return group;
  }

  async delete(id: number): Promise<void> {
    const result = await this.groupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  async assignUserToGroup(groupId: number, userIds: number[]): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['users'],
    });
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found.`);
    }
    const users = await this.userRepository.findBy({ id: In(userIds) });
    if (users.length === 0) {
      throw new NotFoundException('No valid users found.');
    }
    group.users = [...group.users, ...users];
    return this.groupRepository.save(group);
  }

  async removeUserFromGroup(groupId: number, userId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['users'],
    });
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found.`);
    }
    group.users = group.users.filter((u) => u.id !== userId);
    return this.groupRepository.save(group);
  }

  async assignRoleToGroup(groupId: number, roleIds: number[]): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['roles'],
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const roles = await this.roleRepository.findBy({ id: In(roleIds) });
    group.roles = [...group.roles, ...roles];
    return this.groupRepository.save(group);
  }

  async removeRoleFromGroup(groupId: number, roleId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['roles'],
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    group.roles = group.roles.filter((r) => r.id !== roleId);
    return this.groupRepository.save(group);
  }
}
