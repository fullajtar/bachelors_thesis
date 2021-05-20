import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, Session, ValidationPipe} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.entity";
import {Company} from "../company/company.entity";
import {GetEmployeeFilterDto} from "./dto/get-employee-filter.dto";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {CompanyService} from "../company/company.service";

@Controller('employee')
export class EmployeeController{
    constructor(
        private employeeService: EmployeeService,
        private companyService: CompanyService
    ) {}

    @Get()
    @Render('employee/employees.hbs')
    async getEmployees(
        @Session() session: Record<string, any>,
        @Query(ValidationPipe) filterDto: GetEmployeeFilterDto,
    ): Promise<Employee[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.getEmployees(company, filterDto);
        }
        return { url: '/auth', status: 401};
    }

    @Get('/create')
    @Render('employee/create-employee.hbs')
    async createEmployeeForm(
        @Session() session: Record<string, any>,
    ):Promise <Employee | {url:string, status:number}> {
        if (session.userid){
            return new Employee();
        }
        return { url: '/auth', status: 401};
    }

    @Post('/create')
    @Render('employee/create-employee.hbs')
    async createEmployee(
        @Session() session: Record<string, any>,
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.createEmployee(company, createEmployeeDto);
        }
        return { url: '/auth', status: 401};
    }

    @Get('/:id')
    @Render('employee/detail-employee.hbs')
    async getEmployee(
        @Session() session: Record<string, any>,
        @Param('id', ParseIntPipe) id: number,
    ):Promise<Employee | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.getEmployeeById(company, id);
        }
        return { url: '/auth', status: 401};
    }

    @Post('/:id')
    @Render('employee/detail-employee.hbs')
    async editEmployee(
        @Session() session: Record<string, any>,
        @Param('id', ParseIntPipe) id: number,
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee | {url:string, status:number}> { //TODO NOT SECURE!
        if (session.userid){
            return this.employeeService.editEmployee(id, createEmployeeDto);
        }
        return { url: '/auth', status: 401};
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }
}