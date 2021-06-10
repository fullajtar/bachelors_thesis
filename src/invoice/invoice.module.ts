import {Module} from "@nestjs/common";
import {InvoiceController} from "./invoice.controller";
import {InvoiceService} from "./invoice.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {InvoiceRepository} from "./invoice.repository";
import {AuthModule} from "../auth/auth.module";
import {ProductService} from "../product/product.service";
import {ProductRepository} from "../product/product.repository";
import {ItemRepository} from "../item/item.repository";
import {ItemService} from "../item/item.service";
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
    controllers: [InvoiceController],
    providers: [InvoiceService, ProductService, ItemService, CompanyService, CustomerService, OrderService],
})
export class InvoiceModule {}
