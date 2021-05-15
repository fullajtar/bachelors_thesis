import {Injectable, Param, ParseIntPipe, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InvoiceRepository} from "../invoices/invoice.repository";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {Expense} from "./expense.entity";
import {ExpenseRepository} from "./expense.repository";
import {Company} from "../company/company.entity";
import {CreateExpenseDto} from "./dto/create-expense.dto";

@Injectable()
export class ExpenseService{

    constructor(
        private expenseRepository: ExpenseRepository,
    ) {}

    async createExpense(
        createExpenseDto: CreateExpenseDto,
        company: Company,
    ) :Promise<Expense> {
        return this.expenseRepository.createExpense(createExpenseDto, company);
    }

    async getExpenses(
        company: Company,
    ) :Promise<Expense[]> {
        return this.expenseRepository.find({ where: {company : company.id} });
    }

    async getExpenseById(
        id: number,
        company: Company,
    ) :Promise<Expense> {
        return this.expenseRepository.findOne( { where: { id : id, company : company.id } });
    }

    async editExpense(
        id: number,
        company: Company,
        createExpenseDto: CreateExpenseDto,
    ) :Promise<Expense>{
        const expense = await this.getExpenseById(id, company);
        const {
            expenseDate,
            expenseName,
            expenseBody,
            expenseAmount,
        } = createExpenseDto;
        expense.expenseDate = expenseDate;
        expense.expenseName = expenseName;
        expense.expenseBody = expenseBody;
        expense.expenseAmount = expenseAmount;

        await expense.save();
        return expense;
    }

}