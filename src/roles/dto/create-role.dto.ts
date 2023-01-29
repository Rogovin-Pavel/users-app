import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "Administrator's role" })
  readonly value: string;

  @ApiProperty({
    example: 'Administrator',
    description: "Administrator's description",
  })
  readonly description: string;
}
