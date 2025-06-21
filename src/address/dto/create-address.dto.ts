import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Bukhara region' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'Bukhara City District', required: false })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({ example: 85, description: 'Экологический рейтинг (0-100)', required: false })
  @IsNumber()
  @IsOptional()
  ecoRating?: number;
  @ApiProperty({ example: 85, description: 'Latitude', required: false })
  @IsNumber()
  @IsOptional()
  lat: number;
  @ApiProperty({ example: 85, description: 'langtutude', required: false })
  @IsNumber()
  @IsOptional()
  lng: number;
}
