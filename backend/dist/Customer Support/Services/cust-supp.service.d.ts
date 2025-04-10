import { Model } from 'mongoose';
import { CreateFeedbackDto } from '../Dtos/feedback.dto';
import { SupportThread } from '../Schemas/cust-supp.schema';
export declare class CustomerSupportService {
    private supportThreadModel;
    constructor(supportThreadModel: Model<SupportThread>);
    createThread(initialMessage: CreateFeedbackDto): Promise<SupportThread>;
    getAllThreads(): Promise<SupportThread[]>;
    getThreadById(id: string): Promise<SupportThread>;
    addMessageToThread(threadId: string, message: CreateFeedbackDto): Promise<SupportThread>;
}
