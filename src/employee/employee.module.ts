import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {EmployeeRepository} from "./employee.repository";
import {EmployeeController} from "./employee.controller";
import {EmployeeService} from "./employee.service";
import {CompanyRepository} from "../company/company.repository";
import {CompanyService} from "../company/company.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeRepository, CompanyRepository]),
        AuthModule,
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService, CompanyService],
})
export class EmployeeModule {}