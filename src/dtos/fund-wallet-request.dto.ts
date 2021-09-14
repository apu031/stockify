import { ApiProperty } from '@nestjs/swagger';

export class FundWalletRequestDto {
  @ApiProperty({
    description: 'Fund amount for wallet',
    type: 'number',
  })
  fund: number;
}
