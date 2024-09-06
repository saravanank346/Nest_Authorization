import { Module } from '@nestjs/common';
import { CaslService } from './casl.service';
import { CaslController } from './casl.controller';
import {
  ObjectEntity,
  Permission,
  Role,
  RolePermission,
  User,
  User_role_mapping,
} from './entities/casl.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityService } from 'src/ability/ability.service';
import { AbilityFactory } from 'src/ability/ability.factory';

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
  controllers: [CaslController],
  providers: [CaslService, AbilityService, AbilityFactory],
})
export class CaslModule {}
