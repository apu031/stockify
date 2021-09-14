import { ApiProperty } from '@nestjs/swagger';

export class TransactionRequestDto {
  @ApiProperty({
    description: 'Stock Quantity',
    type: 'number',
  })
  quantity: number;
}
