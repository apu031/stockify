import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PortfolioService } from "./portfolio/portfolio.service";

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
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
  ) {}

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
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Get user profile',
  })
  @ApiBearerAuth('accessToken')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('portfolio')
  @ApiOperation({
    summary: 'Get user portfolio',
  })
  @ApiBearerAuth('accessToken')
  getPortfolio(@Request() req) {
    return this.portfolioService.getPortfolioByUserId(req.user.userId);
  }
}
