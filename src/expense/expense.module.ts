import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InvoiceRepository} from "../invoices/invoice.repository";
import {InvoiceItemListRepository} from "../invoiceItems/invoiceItemList.repository";
import {ItemRepository} from "../Items/item.repository";
import {CompanyRepository} from "../company/company.repository";
import {CustomerRepository} from "../customer/customer.repository";
import {OrderRepository} from "../order/order.repository";
import {AuthModule} from "../auth/auth.module";
import {InvoicesController} from "../invoices/invoices.controller";
import {InvoicesService} from "../invoices/invoices.service";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {ItemService} from "../Items/item.service";
import {CompanyService} from "../company/company.service";
import {CustomerService} from "../customer/customer.service";
import {OrderService} from "../order/order.service";
import {ExpenseRepository} from "./expense.repository";
import {ExpenseController} from "./expense.controller";
import {ExpenseService} from "./expense.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ExpenseRepository]),
        AuthModule,
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})
export class ExpenseModule {}