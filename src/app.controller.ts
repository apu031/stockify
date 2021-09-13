import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

class LoginDto {
  @ApiProperty({
    description: 'username',
  })
  username: string;
  @ApiProperty({
    description: 'password',
  })
  password: string;
}

@ApiTags('AppLevel')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Open API',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'Login endpoint',
  })
  @ApiBody({
    type: LoginDto,
  })
  async login(@Request() req) {
    return req.user;
  }
}
