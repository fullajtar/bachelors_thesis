import {Expense} from "./expense.entity";
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Render,
    Session,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ExpenseService} from "./expense.service";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Company} from "../company/company.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';
import * as path from "path";
import {CompanyService} from "../company/company.service";

export const storage = {
    storage: diskStorage({
        destination: './uploads/expenseImages',
        filename: (req, expenseFile, cb) => {
            const filename: string = path.parse(expenseFile.originalname).name.replace(/\s/g, "") + uuidv4();
            const extenstion: string = path.parse(expenseFile.originalname).ext;

            cb(null, `${filename}${extenstion}`)
        }
    })
}

@Controller('expense')
export class ExpenseController{
    constructor(
        private expenseService: ExpenseService,
        private companyService: CompanyService
    ) {}

    @Get()
    @Render('expense/expenses.hbs')
    async getExpenses(
        @Session() session: Record<string, any>
    ) :Promise<Expense[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.getExpenses(company);
        }
        return { url: '/auth', status: 401};

    }

    @Get('/create')
    @Render('expense/create-expense.hbs')
    createExpenseFrom(
        @Session() session: Record<string, any>,
    ) :Expense | {url:string, status:number}{
        if (session.userid){
            return new Expense();
        }
        return { url: '/auth', status: 401};

    }

    @Post('/create')
    @Render('expense/detail-expense.hbs')
    async createExpense(
        @Session() session: Record<string, any>,
        @Body() createExpenseDto: CreateExpenseDto
    ) :Promise<Expense | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.createExpense(createExpenseDto, company);
        }
        return { url: '/auth', status: 401};

    }

    @Get("/:id")
    @Render('expense/detail-expense.hbs')
    async getExpenseById(
        @Session() session: Record<string, any>,
        @Param('id', ParseIntPipe) id: number,
    ) :Promise<Expense | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.getExpenseById(id, company);
        }
        return { url: '/auth', status: 401};

    }

    @Post("/:id")
    @Render('expense/detail-expense.hbs')
    @UseInterceptors(FileInterceptor('expenseFile', storage))
    async editExpense(
        @Session() session: Record<string, any>,
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() expenseFile,
        @Body() createExpenseDto: CreateExpenseDto,
    ) :Promise<Expense | {url:string, status:number}>{
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.editExpense(id, company, createExpenseDto);
        }
        return { url: '/auth', status: 401};

    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }


}