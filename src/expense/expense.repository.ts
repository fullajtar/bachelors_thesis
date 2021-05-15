import {EntityRepository, getConnection, Repository} from "typeorm";
import {Expense} from "./expense.entity";
import {CreateExpenseDto} from "./dto/create-expense.dto";
import {Company} from "../company/company.entity";

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense>{

    async createExpense(
        createExpenseDto: CreateExpenseDto,
        company: Company,
    ) :Promise<Expense> {
        const {
            expenseDate,
            expenseName,
            expenseBody,
            expenseAmount,
        } = createExpenseDto;
        const expense = new Expense();
        expense.expenseDate = expenseDate;
        expense.expenseName = expenseName;
        expense.expenseBody = expenseBody;
        expense.expenseAmount = expenseAmount;

        expense.company = company;
        await getConnection().manager.save(expense);
        return expense;
    }

}