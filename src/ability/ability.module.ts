import { Module } from '@nestjs/common';
import { AbilityService } from './ability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Role,
  RolePermission,
  Permission,
  ObjectEntity,
  User_role_mapping,
} from 'src/casl/entities/casl.entity';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      RolePermission,
      Permission,
      ObjectEntity,
      User_role_mapping,
    ]),
  ],
  providers: [AbilityService, AbilityFactory],
})
export class AbilityModule {}
