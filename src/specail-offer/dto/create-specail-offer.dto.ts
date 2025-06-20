import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateSpecialOfferDto {
  @ApiProperty({ example: 'Скидка на переработку пластика 30%' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Только до конца месяца' })
  @IsString()
  description: string;
}
