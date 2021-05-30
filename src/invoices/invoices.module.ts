import {Module} from "@nestjs/common";
import {InvoicesController} from "./invoices.controller";
import {InvoicesService} from "./invoices.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InvoiceRepository} from "./invoice.repository";
import {AuthModule} from "../auth/auth.module";
import {ProductService} from "../product/product.service";
import {ProductRepository} from "../product/product.repository";
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
        TypeOrmModule.forFeature([InvoiceRepository, ProductRepository, ItemRepository, CompanyRepository, CustomerRepository, OrderRepository, UserRepository]),
        AuthModule,
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService, ProductService, ItemService, CompanyService, CustomerService, OrderService],
})
export class InvoicesModule {}
