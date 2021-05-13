import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, ValidationPipe} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.entity";
import {Company} from "../company/company.entity";
import {GetEmployeeFilterDto} from "./dto/get-employee-filter.dto";
import {CreateEmployeeDto} from "./dto/create-employee.dto";

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

    @Get('/create')
    @Render('employee/create-employee.hbs')
    createEmployeeForm(
    ):Employee {
        return new Employee();
    }

    @Post('/create')
    @Render('employee/create-employee.hbs')
    createEmployee(
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee> {
        const company = new Company();
        company.id = 1;
        return this.employeeService.createEmployee(company, createEmployeeDto);
    }

    @Get('/:id')
    @Render('employee/detail-employee.hbs')
    getEmployee(
        @Param('id', ParseIntPipe) id: number,
    ):Promise<Employee> {
        const company = new Company();
        company.id = 1;
        return this.employeeService.getEmployeeById(company, id);
    }

    @Post('/:id')
    @Render('employee/detail-employee.hbs')
    editEmployee(
        @Param('id', ParseIntPipe) id: number,
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee> {
        return this.employeeService.editEmployee(id, createEmployeeDto);
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