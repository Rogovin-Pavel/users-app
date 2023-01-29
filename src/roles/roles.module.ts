import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '@src/roles/roles.model';
import { User } from '@src/users/users.model';
import { UserRoles } from '@src/roles/user-roles.model';
import { RolesService } from '@src/roles/roles.service';
import { RolesController } from '@src/roles/roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
