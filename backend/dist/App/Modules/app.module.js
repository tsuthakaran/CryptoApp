"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../Controllers/app.controller");
const app_service_1 = require("../Services/app.service");
const mongoose_1 = require("@nestjs/mongoose");
const wallet_module_1 = require("../../Wallet/Modules/wallet.module");
const transactions_module_1 = require("../../Transactions/Modules/transactions.module");
const cust_supp_module_1 = require("../../Customer Support/Modules/cust-supp.module");
const auth_module_1 = require("../../Auth/Modules/auth.module");
const username = encodeURIComponent("mongoDBfrostyshrek");
const password = encodeURIComponent("CFRci28MGXkr34uw");
const uri = 'mongodb+srv://mongoDBfrostyshrek:CFRci28MGXkr34uw@clustermain.g1xju.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(uri),
            wallet_module_1.WalletModule,
            transactions_module_1.TransactionModule,
            cust_supp_module_1.SupportThreadModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map