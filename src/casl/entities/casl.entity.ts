import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('objects')
export class ObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => ObjectEntity, (objectEntity) => objectEntity.id)
  @JoinColumn({ name: 'objectId' })
  objectId: number;
}

@Entity('role_permissions_mapping')
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  roleId: number;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn({ name: 'permissionId' })
  permissionId: number;
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity('users_role_mapping')
export class User_role_mapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  roleId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
