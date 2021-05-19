import {Body, Controller, Get, Post, Redirect, Render, Session, UsePipes, ValidationPipe} from "@nestjs/common";
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
        @Session() session: Record<string, any>,
    ): Promise<Company>{
        console.log(session)
        if (session.userid){
            return this.companyService.getMyCompany(session.userid);
        }
        return;
    }

    @Post()
    @Render('company/editMyCompany.hbs')
    editMyCompany(
        @Session() session: Record<string, any>,
        @Body() createCompanyDto: CreateCompanyDto,
    ): Promise<Company> {
        console.log(session)
        if (session.userid){
            const user = new User();
            user.id = session.userid;
            return this.companyService.editMyCompany(user, createCompanyDto);
        }
        return;

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
        @Session() session: Record<string, any>,
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    ): Promise<Company>{
        console.log("company controller")
        console.log(session)
        if (session.userid){
            const user = new User();
            user.id = session.userid;
            return this.companyService.createMyCompany(user, createCompanyDto);
        }
        return;

    }
    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }
}