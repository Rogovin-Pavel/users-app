import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Unique email' })
  readonly email: string;

  @ApiProperty({ example: '1234567-', description: 'Password' })
  readonly password: string;
}
