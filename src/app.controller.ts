import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { application } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): string {
    return this.appService.getHello();
  }
}
