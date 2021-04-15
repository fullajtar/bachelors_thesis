import {Module} from "@nestjs/common";
import {InvoicesController} from "./invoices.controller";
import {InvoicesService} from "./invoices.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InvoiceRepository} from "./invoice.repository";
import {AuthModule} from "../auth/auth.module";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {InvoiceItemListRepository} from "../invoiceItems/invoiceItemList.repository";
import {ItemRepository} from "../Items/item.repository";
import {ItemService} from "../Items/item.service";
import {EmployeeRepository} from "../employee/employee.repository";
import {EmployeeService} from "../employee/employee.service";
import {CompanyService} from "../company/company.service";
import {CompanyRepository} from "../company/company.repository";
import {CustomerRepository} from "../customer/customer.repository";
import {CustomerService} from "../customer/customer.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([InvoiceRepository, InvoiceItemListRepository, ItemRepository, EmployeeRepository, CompanyRepository, CustomerRepository]),
        AuthModule,
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService, InvoiceItemListsService, ItemService, EmployeeService, CompanyService, CustomerService],
})
export class InvoicesModule {}
