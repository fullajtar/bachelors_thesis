import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderRepository} from "./order.repository";
import {AuthModule} from "../auth/auth.module";
import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";
import {CustomerService} from "../customer/customer.service";
import {ProductService} from "../product/product.service";
import {CustomerRepository} from "../customer/customer.repository";
import {ProductRepository} from "../product/product.repository";
import {ItemRepository} from "../Items/item.repository";
import {ItemService} from "../Items/item.service";
import {CompanyRepository} from "../company/company.repository";
import {CompanyService} from "../company/company.service";
import {EmployeeRepository} from "../employee/employee.repository";
import {EmployeeService} from "../employee/employee.service";
import {UserRepository} from "../auth/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRepository, CustomerRepository, ProductRepository, ItemRepository, CompanyRepository, EmployeeRepository, UserRepository]),
        AuthModule,
    ],
    controllers: [OrderController],
    providers: [OrderService, CustomerService, ProductService, ItemService, CompanyService, EmployeeService],
})
export class OrderModule {}