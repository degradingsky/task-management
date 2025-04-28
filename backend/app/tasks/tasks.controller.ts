import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import IdParam from './dto/id-param.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdParam) {
    return this.tasksService.findOne(param.id);
  }

  @Put(':id')
  update(@Param() param: IdParam, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(param.id, body);
  }

  @Delete(':id')
  delete(@Param() param: IdParam) {
    return this.tasksService.delete(param.id);
  }
}
