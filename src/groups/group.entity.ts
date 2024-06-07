import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { User } from 'src/users/user.entity';

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Role, (role) => role.group)
  roles: Role[];

  @ManyToMany(() => User, (user) => user.groups)
  users: User[];
}
