import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    name!: string;  // ← add !

    @IsString()
    @IsNotEmpty()
    description!: string;  // ← add !

    @IsEnum(TodoStatus)
    @IsOptional()
    status?: TodoStatus;  // ← keep ? here (already optional, no need for !)
}