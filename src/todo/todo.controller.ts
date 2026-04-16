import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos') // ← base route: /todos
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    // POST /todos
    @Post()
    async create(@Body() createTodoDto: CreateTodoDto) {
        let response = await this.todoService.create(createTodoDto);
        return {
            'status_code':  1,
            'data' : response
        };
    }

    // GET /todos
    @Get()
    async findAll() {
        let response = await this.todoService.findAll();
        return {
            'status_code':  1,
            'data' : response
        };
    }

    // GET /todos/:id
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        let response = await this.todoService.findOne(id);
        return {
            'status_code':  1,
            'data' : response
        };
    }

    // PUT /todos/:id
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto,
    ) {
        let response = await this.todoService.update(id, updateTodoDto);
        return {
            'status_code':  1,
            'data' : response
        };
    }

    // DELETE /todos/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.remove(id);
    }
}