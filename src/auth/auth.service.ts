import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { User } from '@src/users/users.model';
import { UsersService } from '@src/users/users.service';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const existingUser = await this.usersService.getUserByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    const password = await bcrypt.hash(userDto.password, +process.env.SALT);
    const user = await this.usersService.createUser({ ...userDto, password });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid password or email' });
  }
}
