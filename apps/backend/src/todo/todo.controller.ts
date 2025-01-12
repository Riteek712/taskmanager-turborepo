import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { TodoStatus } from '@prisma/client';


@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To Add a new task wrt to the user email.', summary: 'Add a new Task.' })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  userEmail: string) {
    console.log("output")
    return await this.todoService.create(createTodoDto, userEmail);
  }

  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiQuery({
  name: 'status',
  required: false,
  description: 'Filter tasks by status (e.g., DONE, ACTIVE, WORKING)',
  example: 'WORKING',
})
@ApiQuery({
  name: 'sortByDeadline',
  required: false,
  description: 'Sort tasks by deadline (asc or desc)',
  example: 'asc',
})
@ApiOperation({
  description: 'To get all the user tasks with optional filters.',
  summary: 'To get all the user tasks.',
})
@Get()
async findAll(
  @UserEmail() userEmail: string,
  @Query('status') status?: TodoStatus, // Specify the type as TodoStatus
  @Query('sortByDeadline') sortByDeadline?: 'asc' | 'desc',
) {
  console.log(userEmail);
  return await this.todoService.findAll(userEmail, status, sortByDeadline);
}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To get a specific the user task.', summary: 'To get a specific the user task.' })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @UserEmail()
    userEmail: string) {
    return this.todoService.findOne(+id, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To update a specific the user task.', summary: 'To update a specific the user task.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @UserEmail() userEmail: string, 
  @Body() updateTodoDto: UpdateTodoDto
) {
    return this.todoService.update(+id,userEmail, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To delete a specific the user task.', summary: 'To delete a specific the user task.' })
  @Delete(':id')
  remove(
    @Param('id') id: string,
  @UserEmail() userEmail: string) {
    return this.todoService.remove(+id, userEmail);
  }
}
