import { CustomerSupportService } from '../Services/cust-supp.service';
import { CreateFeedbackDto } from '../Dtos/feedback.dto';
export declare class CustomerSupportController {
    private readonly customerSupportService;
    constructor(customerSupportService: CustomerSupportService);
    getAllThreads(): Promise<import("../Schemas/cust-supp.schema").SupportThread[]>;
    getThread(id: string): Promise<import("../Schemas/cust-supp.schema").SupportThread>;
    createThread(dto: CreateFeedbackDto): Promise<import("../Schemas/cust-supp.schema").SupportThread>;
    addMessage(threadId: string, dto: CreateFeedbackDto): Promise<import("../Schemas/cust-supp.schema").SupportThread>;
}
