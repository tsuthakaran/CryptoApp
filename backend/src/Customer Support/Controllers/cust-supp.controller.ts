import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { CustomerSupportService } from '../Services/cust-supp.service';
import { CreateFeedbackDto } from '../Dtos/feedback.dto';

@Controller('customerSupport')
export class CustomerSupportController {
  constructor(private readonly customerSupportService: CustomerSupportService) {}

  @Get()
  async getAllThreads() {
    return this.customerSupportService.getAllThreads();
  }

  @Get(':id')
  async getThread(@Param('id') id: string) {
    return this.customerSupportService.getThreadById(id);
  }

  @Post('create-thread')
  async createThread(@Body() dto: CreateFeedbackDto) {
    return this.customerSupportService.createThread(dto);
  }

  @Post(':id/reply')
  async addMessage(@Param('id') threadId: string, @Body() dto: CreateFeedbackDto) {
    return this.customerSupportService.addMessageToThread(threadId, dto);
  }
  
}
