import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 'user-id-456', description: 'Кому ставим оценку' })
  @IsString()
  toUser: string;

  @ApiProperty({ example: 'Bukhara', description: 'Регион оценки' })
  @IsString()
  region: string;

  @ApiProperty({ example: 5, description: 'Оценка от 1 до 5' })
  @IsInt()
  @Min(1)
  score: number;
}
