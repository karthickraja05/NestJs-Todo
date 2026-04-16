import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>, // ← injects Todo table
    ) { }

    // CREATE
    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepository.create(createTodoDto);
        return await this.todoRepository.save(todo);
    }

    // READ ALL
    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    // READ ONE
    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return todo;
    }

    // UPDATE
    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.findOne(id); // ← checks if todo exists first
        Object.assign(todo, updateTodoDto); // ← merges new data into existing todo
        return await this.todoRepository.save(todo);
    }

    // DELETE
    async remove(id: number): Promise<{ 
        status_code: number; 
        message: string 
    }> {
        // We use a separate find check here so we don't trigger findOne's exception
        const todo = await this.todoRepository.findOne({ where: { id } });

        if (!todo) {
            return {
                status_code: 0,
                message: `Todo with id ${id} was not found, so it could not be deleted.`
            };
        }

        await this.todoRepository.remove(todo);
        
        return {
            status_code: 1,
            message: `Todo with id ${id} deleted successfully`
        };
        
    }
}