import {Module} from "@nestjs/common";
import {InvoicesModule} from "./invoices/invoices.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "src/config/typeorm.config";
import {AuthModule} from "./auth/auth.module";
import {OrderModule} from "./order/order.module";
import {ItemModule} from "./Items/item.module";
import {EmployeeModule} from "./employee/employee.module";
import {CompanyModule} from "./company/company.module";
import {ExpenseModule} from "./expense/expense.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {InvoiceRepository} from "./invoices/invoice.repository";
import {InvoiceItemListRepository} from "./invoiceItems/invoiceItemList.repository";
import {ItemRepository} from "./Items/item.repository";
import {CompanyRepository} from "./company/company.repository";
import {CustomerRepository} from "./customer/customer.repository";
import {OrderRepository} from "./order/order.repository";
import {ExpenseRepository} from "./expense/expense.repository";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([InvoiceRepository, ExpenseRepository]),
    InvoicesModule,
    AuthModule,
    OrderModule,
      ItemModule,
      EmployeeModule,
      CompanyModule,
      ExpenseModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
