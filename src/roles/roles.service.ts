import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './role.entity';
import { RoleDto } from './role.dto';
import { Permission } from 'src/permissions/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(roleDto: RoleDto): Promise<Role> {
    const role = this.roleRepository.create(roleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }
    return role;
  }

  async delete(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  async assignPermissionToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found.`);
    }
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds),
    });
    role.permissions = [...role.permissions, ...permissions];
    return this.roleRepository.save(role);
  }

  async removePermissionFromRole(
    roleId: number,
    permissionId: number,
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found.`);
    }
    role.permissions = role.permissions.filter((p) => p.id !== permissionId);
    return this.roleRepository.save(role);
  }
}
