import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('text')
    description!: string;

    @Column({
        type: 'enum',
        enum: TodoStatus,
        default: TodoStatus.PENDING,
    })
    status!: TodoStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}