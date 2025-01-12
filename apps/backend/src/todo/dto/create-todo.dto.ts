import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The task description',
    example: 'Buy groceries',
  })
  @IsString()
  task: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example: 'Buy vegetables, fruits, and dairy products from the supermarket.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    example: 'ACTIVE',
    enum: ['DONE', 'ACTIVE', 'WORKING'],
  })
  @IsEnum(['DONE', 'ACTIVE', 'WORKING'])
  status: 'DONE' | 'ACTIVE' | 'WORKING';

  @ApiPropertyOptional({
    description: 'Deadline for the task',
    example: '2024-08-15T12:30:00Z',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deadline?: Date;

  
}
