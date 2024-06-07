import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Group } from '../groups/group.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable()
  groups: Group[];
}
