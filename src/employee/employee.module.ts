import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {EmployeeRepository} from "./employee.repository";
import {EmployeeController} from "./employee.controller";
import {EmployeeService} from "./employee.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeRepository]),
        AuthModule,
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}