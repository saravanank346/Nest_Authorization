import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ObjectEntity,
  Permission,
  Role,
  RolePermission,
  User,
  User_role_mapping,
} from 'src/casl/entities/casl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(User_role_mapping)
    private userRoleMappingRepository: Repository<User_role_mapping>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private PermissionRepository: Repository<RolePermission>,
    @InjectRepository(Permission)
    private rolePermissionRepository: Repository<Permission>,
    @InjectRepository(ObjectEntity)
    private objectRepository: Repository<ObjectEntity>,
  ) {}
  async findAllPermissionsOfUser(user: User) {
    console.log(user, 'sevice user');

    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('users_role_mapping', 'um', 'um.userId = user.id')
      .leftJoin('roles', 'r', 'um.roleId = r.id')
      .leftJoin('role_permissions_mapping', 'rpm', 'rpm.roleId = r.id')
      .leftJoin('permissions', 'p', 'rpm.permissionId = p.id')
      .leftJoin('objects', 'o', 'p.objectId = o.id')
      .where('user.id = :userId', { userId: user })
      .select([
        'user.id',
        'r.name AS role_name',
        'p.action',
        'o.name AS object_name',
      ])
      .getRawMany();
  }
}
