import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Prisma, TodoStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: PrismaService){}

  async create(createTodoDto: CreateTodoDto, email: string){
    try{
      const user = await this.databaseService.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      let data: Prisma.TodoCreateInput = {
        description : createTodoDto.description,
        task: createTodoDto.task,
        status : createTodoDto.status,
        deadline: createTodoDto.deadline,
        user: {
          connect: { email: user.email },
        },
      }
      return  this.databaseService.todo.create({data});
    }catch(err){
      return err
    }
    
  }

  async findAll(userEmail: string, status?: TodoStatus, sortByDeadline?: 'asc' | 'desc') {
    // Filter only valid status values
    const validStatus = status && Object.values(TodoStatus).includes(status as TodoStatus)
      ? status
      : undefined;
  
    return this.databaseService.todo.findMany({
      where: {
        userEmail: userEmail,
        ...(validStatus && { status: validStatus }), // Use validStatus in the query
      },
      orderBy: sortByDeadline
        ? { deadline: sortByDeadline }
        : undefined,
    });
  }
  

  async findOne(id: number, userEmail: string) {
    return this.databaseService.todo.findFirst({
      where:{
        id: id,
        userEmail: userEmail
      }
    })
  }

  async update(id: number,userEmail: string, updateTodoDto: UpdateTodoDto) {
    
    return this.databaseService.todo.update({
      where:{
        id:id,
        userEmail:userEmail
      },
      data: updateTodoDto
    });
  }

  async remove(id: number, userEmail: string) {
    return this.databaseService.todo.delete({
      where:{
        id: id,
        userEmail: userEmail
      }
    });
  }
}
