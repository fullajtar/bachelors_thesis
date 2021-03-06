import {Module} from "@nestjs/common";
import {InvoiceModule} from "./invoice/invoice.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "src/config/typeorm.config";
import {AuthModule} from "./auth/auth.module";
import {OrderModule} from "./order/order.module";
import {ItemModule} from "./item/item.module";
import {EmployeeModule} from "./employee/employee.module";
import {CompanyModule} from "./company/company.module";
import {ExpenseModule} from "./expense/expense.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {InvoiceRepository} from "./invoice/invoice.repository";
import {CompanyRepository} from "./company/company.repository";
import {ExpenseRepository} from "./expense/expense.repository";
import {CompanyService} from "./company/company.service";
import {UserRepository} from "./auth/user.repository";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([InvoiceRepository, ExpenseRepository, CompanyRepository, UserRepository]),
    InvoiceModule,
    AuthModule,
    OrderModule,
      ItemModule,
      EmployeeModule,
      CompanyModule,
      ExpenseModule,
  ],

  controllers: [AppController],
  providers: [AppService, CompanyService],
})
export class AppModule {}
