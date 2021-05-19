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
import {CompanyService} from "../company/company.service";
import {CompanyRepository} from "../company/company.repository";
import {CustomerRepository} from "../customer/customer.repository";
import {CustomerService} from "../customer/customer.service";
import {OrderRepository} from "../order/order.repository";
import {OrderService} from "../order/order.service";
import {UserRepository} from "../auth/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([InvoiceRepository, InvoiceItemListRepository, ItemRepository, CompanyRepository, CustomerRepository, OrderRepository, UserRepository]),
        AuthModule,
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService, InvoiceItemListsService, ItemService, CompanyService, CustomerService, OrderService],
})
export class InvoicesModule {}
