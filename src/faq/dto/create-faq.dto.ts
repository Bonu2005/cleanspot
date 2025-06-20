import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum FaqCategory {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL',
}

export class CreateFaqDto {
  @ApiProperty({ example: 'Как вызвать машину?', description: 'Вопрос' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'Зайдите в раздел заявки и заполните форму', description: 'Ответ' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ enum: FaqCategory, example: FaqCategory.CLIENT })
  @IsEnum(FaqCategory)
  category: FaqCategory;
}
