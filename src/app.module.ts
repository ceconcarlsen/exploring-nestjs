import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule], //So Nest can understand what are u using in your API
  controllers: [AppController], //How u handle incoming requests
  providers: [AppService], //Similar when i use context in React
})
export class AppModule {} //Split by features in your app
