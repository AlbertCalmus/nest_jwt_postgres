import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async redirect(@Res() res) {
    return res.redirect('/api');
  }
}
