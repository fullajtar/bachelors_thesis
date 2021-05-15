import {Expense} from "./expense.entity";
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Render, UploadedFile,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {ExpenseService} from "./expense.service";
import {GetInvoicesFilterDto} from "../invoices/dto/get-invoices-filter.dto";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Company} from "../company/company.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';
import * as path from "path";
import {Observable, of} from "rxjs";

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
    ) {}

    @Get()
    @Render('expense/expenses.hbs')
    getExpenses(

    ) :Promise<Expense[]> {
        const company = new Company();
        company.id = 1;
        return this.expenseService.getExpenses(company);
    }

    @Get('/create')
    @Render('expense/create-expense.hbs')
    createExpenseFrom(
    ) :Expense {
        return new Expense();
    }

    @Post('/create')
    @Render('expense/detail-expense.hbs')
    createExpense(
        @Body() createExpenseDto: CreateExpenseDto
    ) :Promise<Expense> {
        const company = new Company();
        company.id = 1;
        return this.expenseService.createExpense(createExpenseDto, company);
    }

    @Get("/:id")
    @Render('expense/detail-expense.hbs')
    getExpenseById(
        @Param('id', ParseIntPipe) id: number,

    ) :Promise<Expense> {
        const company = new Company();
        company.id = 1;
        return this.expenseService.getExpenseById(id, company);
    }

    @Post("/:id")
    @Render('expense/detail-expense.hbs')
    @UseInterceptors(FileInterceptor('expenseFile', storage))
    editExpense(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() expenseFile,
        @Body() createExpenseDto: CreateExpenseDto,
    ) :Promise<Expense>{
        console.log(expenseFile)
        const company = new Company();
        company.id = 1;
        return this.expenseService.editExpense(id, company, createExpenseDto);
    }


}