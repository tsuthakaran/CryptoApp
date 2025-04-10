import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from '../Dtos/feedback.dto';
import { CustomerSupport, SupportThread } from '../Schemas/cust-supp.schema';

@Injectable()
export class CustomerSupportService {
  constructor(@InjectModel(SupportThread.name) private supportThreadModel: Model<SupportThread>,) {}

  async createThread(initialMessage: CreateFeedbackDto): Promise<SupportThread> {
    const newThread = await this.supportThreadModel.create({
      messages: [initialMessage],
    });
    return newThread;
  }

  async getAllThreads(): Promise<SupportThread[]> {
    return this.supportThreadModel.find().exec();
  }

  async getThreadById(id: string): Promise<SupportThread> {
    const thread = await this.supportThreadModel.findById(id);
    if (!thread) throw new NotFoundException('Thread not found');
    return thread;
  }

  async addMessageToThread(threadId: string, message: CreateFeedbackDto): Promise<SupportThread> {
    const thread = await this.supportThreadModel.findById(threadId);
    if (!thread) throw new NotFoundException('Thread not found');

    thread.messages.push(message as any);
    await thread.save();
    return thread;
  }
}