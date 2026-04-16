import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'karthick',
            password: 'kar@7890',
            database: 'test',
            autoLoadEntities: true, // ← auto picks all entities from each module
            synchronize: true,      // ← auto creates/updates tables in DB
        }),
        TodoModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
