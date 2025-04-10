"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("../Services/transactions.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("../../Wallet/Schemas/wallet.schema");
const create_transaction_dto_1 = require("../Dtos/create-transaction.dto");
let TransactionController = class TransactionController {
    transactionService;
    walletModel;
    constructor(transactionService, walletModel) {
        this.transactionService = transactionService;
        this.walletModel = walletModel;
    }
    async createTransaction(createTransactionDto) {
        return this.transactionService.createTransaction(createTransactionDto);
    }
    respondToRequest(id, responseDto) {
        return this.transactionService.respondToRequest(id, responseDto.approved);
    }
    async getTransactionsFromUser() {
        return this.transactionService.getTransactions();
    }
    async getTransactionById(id) {
        try {
            const transaction = await this.transactionService.getTransactionById(id);
            if (!transaction) {
                throw new common_1.HttpException('Transaction not found', common_1.HttpStatus.NOT_FOUND);
            }
            return transaction;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to fetch transaction', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransactionsByWallet(wAddress) {
        try {
            const wallet = await this.walletModel.findOne({ wAddress }).populate('transactions').exec();
            if (!wallet) {
                throw new common_1.HttpException('Wallet not found', common_1.HttpStatus.NOT_FOUND);
            }
            return wallet.transactions;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch transactions', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Patch)(':id/respond'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "respondToRequest", null);
__decorate([
    (0, common_1.Get)(':id/user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsFromUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionById", null);
__decorate([
    (0, common_1.Get)('by-wallet/:wAddress'),
    __param(0, (0, common_1.Param)('wAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsByWallet", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transactions'),
    __param(1, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [transactions_service_1.TransactionService,
        mongoose_2.Model])
], TransactionController);
//# sourceMappingURL=transactions.controller.js.map