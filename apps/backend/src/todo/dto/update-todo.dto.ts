import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiPropertyOptional()
    @IsOptional()
    status : TodoStatus
}

enum TodoStatus {
    ACTIVE = 'ACTIVE',
    DONE = 'DONE',
    WORKING = 'WORKING'
}


