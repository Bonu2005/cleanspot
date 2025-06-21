import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFcmTokenDto {
  @ApiProperty()
  @IsString()
  fcmToken: string;
}



export class ReportLocationDto {
  @ApiProperty({ example: 41.2995, description: 'Latitude of the courier' })
  lat: number;

  @ApiProperty({ example: 69.2401, description: 'Longitude of the courier' })
  long: number;
}


export class CancelOrderDto {
  @ApiProperty({ example: 'b19c8e2e-8d2b-4b92-8231-74ed7a5b0e01' })
  orderId: string;

  @ApiProperty({ example: 'User no longer needs service' })
  reason: string;
}


class LocationDto {
  @ApiProperty({ example: 41.2995 })
  lat: number;

  @ApiProperty({ example: 69.2401 })
  long: number;

  @ApiProperty({ example: 'Amir Temur street 15' })
  name: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: LocationDto })
  location: LocationDto;

  @ApiProperty({ example: 2 })
  assistant_count: number;

  @ApiProperty({ example: 'Please bring gloves' })
  comment?: string;
}

// src/order/dto/report-location.dto.ts

