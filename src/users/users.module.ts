import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '@src/users/users.model';
import { Role } from '@src/roles/roles.model';
import { UsersService } from '@src/users/users.service';
import { UsersController } from '@src/users/users.controller';
import { UserRoles } from '@src/roles/user-roles.model';
import { RolesModule } from '@src/roles/roles.module';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
