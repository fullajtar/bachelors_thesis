import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query, Redirect,
    Render,
    Res,
    Session,
    ValidationPipe
} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.entity";
import {Company} from "../company/company.entity";
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
        @Res() res,
    ): Promise<Employee[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.getEmployees(company);
        }
        return res.redirect('/auth');
    }

    @Get('/create')
    @Render('employee/create-employee.hbs')
    async createEmployeeForm(
        @Session() session: Record<string, any>,
        @Res() res
    ):Promise <Employee | {url:string, status:number}> {
        if (session.userid){
            return new Employee();
        }
        return res.redirect('/auth');
    }

    @Post('/create')
    @Render('employee/detail-employee.hbs')
    async createEmployee(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.createEmployee(company, createEmployeeDto);
        }
        return res.redirect('/auth');
    }

    @Get('/:id')
    @Render('employee/detail-employee.hbs')
    async getEmployee(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ):Promise<Employee | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.employeeService.getEmployeeById(company, id);
        }
        return res.redirect('/auth');
    }

    @Post('/:id')
    @Render('employee/detail-employee.hbs')
    async editEmployee(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
        @Body() createEmployeeDto: CreateEmployeeDto,
    ):Promise<Employee | {url:string, status:number}> { //TODO NOT SECURE!
        if (session.userid){
            return this.employeeService.editEmployee(id, createEmployeeDto);
        }
        return res.redirect('/auth');
    }

    @Post('/delete/:id')
    @Redirect('/employee')
    async deleteEmplyee(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number
    ):Promise<null> {
        if (session.userid){
            await this.employeeService.deleteEmployee(await this.getUsersCompany(session.userid), id);
            return
        }
        return res.redirect('/auth');
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }
}