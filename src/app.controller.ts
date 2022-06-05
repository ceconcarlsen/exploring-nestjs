import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

/* 
@Get() --> my-app.com/
@Get('users') --> my-app.com/users
*/


@Controller() //Handle requests
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Header('Content-Type', 'text/html') //U can do it tho
  getHello(): {name: string} {
    return {name: 'Olá'}; //Nest handles definition of HTTP HEADERS 
  }
}
