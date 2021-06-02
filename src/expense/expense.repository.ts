import {EntityRepository, getConnection, Repository} from "typeorm";
import {Expense} from "./expense.entity";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Company} from "../company/company.entity";

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense>{

    async createExpense(
        createExpenseDto: CreateExpenseDto,
        company: Company,
        expenseFile: any
    ) :Promise<Expense> {
        const {
            expenseDate,
            expenseName,
            expenseNote,
            expenseAmount,
        } = createExpenseDto;
        const expense = new Expense();
        expense.date = expenseDate;
        expense.name = expenseName;
        expense.note = expenseNote;
        expense.amount = expenseAmount;
        if (expenseFile){
            expense.fileName = expenseFile.filename;
        }


        expense.company = company;
        await getConnection().manager.save(expense);
        return expense;
    }

}