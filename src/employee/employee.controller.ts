import {Controller, Get, Query, Render, ValidationPipe} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.entity";
import {Company} from "../company/company.entity";
import {GetEmployeeFilterDto} from "./dto/get-employee-filter.dto";

@Controller('employee')
export class EmployeeController{
    constructor(
        private employeeService: EmployeeService,
    ) {}

    @Get()
    @Render('employee/employees.hbs')
    getEmployees(
        @Query(ValidationPipe) filterDto: GetEmployeeFilterDto,
    ): Promise<Employee[]> {
        const company = new Company();
        company.id = 1;
        return this.employeeService.getEmployees(company, filterDto);
    }

    // @Post('/create')
    // @UsePipes(ValidationPipe)
    // createEmployee(
    //     @Body() createEmployeeDto: CreateEmployeeDto,
    // ): Promise<Employee> {
    //     const company = new Company();
    //     company.id = 1;
    //     return this.employeeService.createEmployee(company, createEmployeeDto);
    // }



}