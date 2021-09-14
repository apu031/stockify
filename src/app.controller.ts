import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PortfolioService } from './portfolio/portfolio.service';
import { StocksSymbol } from './enums/stock-symbol.enum';
import { FundWalletRequestDto } from './dtos/fund-wallet-request.dto';
import { TransactionRequestDto } from './dtos/transaction-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { UsersService } from './users/users.service';

@ApiTags('AppLevel')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private userService: UsersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Open API',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registration endpoint',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  async registration(@Body() loginRequestDto: LoginRequestDto) {
    const user = await this.userService.createUser(
      loginRequestDto.username,
      loginRequestDto.password,
    );
    await this.portfolioService.createPortfolio(user.userId);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'Login endpoint',
  })
  @ApiBody({
    type: LoginRequestDto,
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

  @UseGuards(JwtAuthGuard)
  @Post('buy/:stock')
  @ApiOperation({
    summary: 'Buy Stocks',
  })
  @ApiParam({
    name: 'stock',
    enum: StocksSymbol,
  })
  @ApiBody({
    type: TransactionRequestDto,
  })
  @ApiBearerAuth('accessToken')
  buyStocks(
    @Request() req,
    @Param() stock,
    @Body() transactionDto: TransactionRequestDto,
  ) {
    return this.portfolioService.buyStocks(
      req.user.userId,
      stock.stock,
      transactionDto.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('sell/:stock')
  @ApiOperation({
    summary: 'Sell Stocks',
  })
  @ApiParam({
    name: 'stock',
    enum: StocksSymbol,
  })
  @ApiBody({
    type: TransactionRequestDto,
  })
  @ApiBearerAuth('accessToken')
  sellStocks(
    @Request() req,
    @Param() stock,
    @Body() transactionDto: TransactionRequestDto,
  ) {
    return this.portfolioService.sellStocks(
      req.user.userId,
      stock.stock,
      transactionDto.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('fund')
  @ApiOperation({
    summary: 'Fund wallet',
  })
  @ApiBody({
    type: FundWalletRequestDto,
  })
  @ApiBearerAuth('accessToken')
  fundWallet(@Request() req, @Body() fundWalletDto: FundWalletRequestDto) {
    return this.portfolioService.fundWalletByUserId(
      req.user.userId,
      fundWalletDto.fund,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribe/prices')
  @ApiOperation({
    summary: 'Get live prices every 5 minutes',
  })
  @ApiBearerAuth('accessToken')
  subscribeForPriceNotification() {
    return this.portfolioService.subscribeForPriceNotification();
  }

  @UseGuards(JwtAuthGuard)
  @Get('unsubscribe/prices')
  @ApiOperation({
    summary: 'Get live prices every 5 minutes',
  })
  @ApiBearerAuth('accessToken')
  unsubscribeForPriceNotification() {
    return this.portfolioService.unsubscribeForPriceNotification();
  }
}
