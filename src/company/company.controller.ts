import {Body, Controller, Get, Post, Redirect, Render, UsePipes, ValidationPipe} from "@nestjs/common";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {Company} from "./company.entity";
import {User} from "../auth/user.entity";
import {CompanyService} from "./company.service";

@Controller('company')
export class CompanyController{
    constructor(
        private companyService: CompanyService,
    ) {}

    @Get()
    @Render('company/editMyCompany.hbs')
    getMyCompany(
        //get user
    ): Promise<Company>{
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        return this.companyService.getMyCompany(user);
    }

    @Post()
    @Render('company/editMyCompany.hbs')
    editMyCompany(
        @Body() createCompanyDto: CreateCompanyDto,
        //get company
    ): Promise<Company> {
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        console.log("company Dto: ",createCompanyDto)
        return this.companyService.editMyCompany(user, createCompanyDto);
    }

    @Get('/create')
    @Render('company/myCompany.hbs')
    createMyCompanyForm(){
        return;
    }

    @Post('/create')
    @Redirect('/invoices')
    @UsePipes(ValidationPipe)
    createMyCompany(
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    ): Promise<Company>{
        const user = new User();
        user.id = 1;
        return this.companyService.createMyCompany(user, createCompanyDto);
    }


}