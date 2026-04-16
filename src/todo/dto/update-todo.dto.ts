import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class UpdateTodoDto {
    @IsString()
    @IsNotEmpty({
        "message" : "Name field should not be empty"
    })
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsEnum(TodoStatus)
    @IsOptional()
    status?: TodoStatus;
}