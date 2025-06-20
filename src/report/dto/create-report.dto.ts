import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReportDto {
  @ApiProperty({ example: 'Проблема с пунктом сбора' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Описание проблемы' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'individual', description: 'Тип отчета: individual/general' })
  @IsString()
  type: string;
}