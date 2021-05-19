import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyRepository} from "../company/company.repository";
import {AuthModule} from "../auth/auth.module";
import {CompanyService} from "../company/company.service";
import {ExpenseRepository} from "./expense.repository";
import {ExpenseController} from "./expense.controller";
import {ExpenseService} from "./expense.service";
import {UserRepository} from "../auth/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ExpenseRepository, CompanyRepository, UserRepository]),
        AuthModule,
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService, CompanyService],
})
export class ExpenseModule {}