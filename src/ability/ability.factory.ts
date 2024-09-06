import { createMongoAbility, MongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
// import { User } from 'src/casl/entities/casl.entity';
import { AbilityService } from './ability.service';
export enum PermissionAction {
  CREATE = 'Create',
  READ = 'Read',
  UPDATE = 'Update',
  DELETE = 'Delete',
}
export type PermissionObjectType = any;
export type AppAbility = MongoAbility<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  subject: string;
}
@Injectable()
export class AbilityFactory {
  constructor(private authoService: AbilityService) {}
  async createForUser(user: any): Promise<AppAbility> {
    const dbPermissions: any =
      await this.authoService.findAllPermissionsOfUser(user);
    console.log(dbPermissions, 'dbPermissions');
    if (dbPermissions) {
      const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
        action: p.p_action,
        subject: p.object_name,
      }));
      console.log(caslPermissions, 'caslPermissions');

      return createMongoAbility<[PermissionAction, PermissionObjectType]>(
        caslPermissions,
      );
    } else {
      return null;
    }
  }
}
