import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Cecon:Mariricardo1@cluster0.y3ni5.mongodb.net/nestjs-demo?retryWrites=true&w=majority'), ProductsModule], //So Nest can understand what are u using in your API
  controllers: [AppController], //How u handle incoming requests
  providers: [AppService], //Similar when i use context in React
})
export class AppModule {} //Split by features in your app
