"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const transaction_schema_1 = require("../Schemas/transaction.schema");
const transactions_service_1 = require("../Services/transactions.service");
const transactions_controller_1 = require("../Controllers/transactions.controller");
const wallet_module_1 = require("../../Wallet/Modules/wallet.module");
let TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule;
exports.TransactionModule = TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema }]),
            wallet_module_1.WalletModule,
        ],
        controllers: [transactions_controller_1.TransactionController],
        providers: [transactions_service_1.TransactionService],
        exports: [transactions_service_1.TransactionService],
    })
], TransactionModule);
//# sourceMappingURL=transactions.module.js.map