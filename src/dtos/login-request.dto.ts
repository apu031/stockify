import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'username',
  })
  username: string;
  @ApiProperty({
    description: 'password',
  })
  password: string;
}
