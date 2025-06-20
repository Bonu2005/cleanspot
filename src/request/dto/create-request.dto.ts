import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RequestType {
  STANDARD = 'STANDARD',
  SPECIAL = 'SPECIAL',
}

export enum RequestStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateRequestDto {
  @ApiProperty({ example: 'STANDARD', enum: RequestType })
  @IsEnum(RequestType)
  type: RequestType;

  @ApiProperty({ example: 'Нужно вывезти мусор с адреса XYZ' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: RequestStatus, default: RequestStatus.OPEN })
  @IsEnum(RequestStatus)
  status: RequestStatus = RequestStatus.OPEN;
}
