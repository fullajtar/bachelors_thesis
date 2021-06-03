import {Expense} from "./expense.entity";
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Render, Res,
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
        destination: './public/uploads/expenseImages',
        filename: (req, expenseFile, cb) => {
            const filename: string = path.parse(expenseFile.originalname).name.replace(/\s/g, "") + uuidv4();
            const extenstion: string = path.parse(expenseFile.originalname).ext;

            cb(null, `${filename}${extenstion}`)
        }
    }),
    fileFilter: (req, expenseFile, cb) => {
        if (expenseFile.mimetype == "image/png" || expenseFile.mimetype == "image/jpg" || expenseFile.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
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
        @Session() session: Record<string, any>,
        @Res() res
    ) :Promise<Expense[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.getExpenses(company);
        }
        return res.redirect('/auth');

    }

    @Get('/create')
    @Render('expense/create-expense.hbs')
    createExpenseFrom(
        @Session() session: Record<string, any>,
        @Res() res
    ) :Expense | {url:string, status:number}{
        if (session.userid){
            return new Expense();
        }
        return res.redirect('/auth');

    }

    @Post('/create') //TODO nejaky bug, udaje sa nedostanu do DTO
    @Render('expense/detail-expense.hbs')
    @UseInterceptors(FileInterceptor('expenseFile', storage))
    async createExpense(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createExpenseDto: CreateExpenseDto,
        @UploadedFile() expenseFile
    ) :Promise<Expense | {url:string, status:number}> {
        console.log("DTO: ", createExpenseDto)
        console.log("file name: ", expenseFile)
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.createExpense(createExpenseDto, company, expenseFile);
        }
        return res.redirect('/auth');

    }

    @Get("/:id")
    @Render('expense/detail-expense.hbs')
    async getExpenseById(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ) :Promise<Expense | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.getExpenseById(id, company);
        }
        return res.redirect('/auth');

    }

    @Post("/:id")
    @Render('expense/detail-expense.hbs')
    @UseInterceptors(FileInterceptor('expenseFile', storage))
    async editExpense(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() expenseFile,
        @Body() createExpenseDto: CreateExpenseDto,
    ) :Promise<Expense | {url:string, status:number}>{
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.expenseService.editExpense(id, company, createExpenseDto, expenseFile);
        }
        return res.redirect('/auth');

    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }


}