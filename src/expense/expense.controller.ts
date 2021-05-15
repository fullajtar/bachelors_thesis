import {Expense} from "./expense.entity";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, ValidationPipe} from "@nestjs/common";
import {ExpenseService} from "./expense.service";
import {GetInvoicesFilterDto} from "../invoices/dto/get-invoices-filter.dto";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Company} from "../company/company.entity";

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
    editExpense(
        @Param('id', ParseIntPipe) id: number,
        @Body() createExpenseDto: CreateExpenseDto,
    ) :Promise<Expense>{
        const company = new Company();
        company.id = 1;
        return this.expenseService.editExpense(id, company, createExpenseDto);
    }




}