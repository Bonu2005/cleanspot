import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";


export class CreatePickupPointDto {
  @ApiProperty({ example: 'Bukhara' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'Kagan' })
  @IsString()
  district: string;

  @ApiProperty({ example: 40.12345 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 64.98765 })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}