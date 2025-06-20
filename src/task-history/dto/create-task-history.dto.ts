import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum TaskStatus {
  ASSIGNED = 'ASSIGNED',
  COMPLETED = 'COMPLETED',
}

export class CreateTaskHistoryDto {
  @ApiProperty({ example: 'Take out special waste', description: 'Описание задачи' })
  @IsString()
  taskDesc: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.ASSIGNED })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: 'request-id-123', required: false })
  @IsOptional()
  @IsString()
  requestId?: string;
}

