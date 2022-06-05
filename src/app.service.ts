import { Injectable } from '@nestjs/common';


@Injectable() //Handle logic
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
