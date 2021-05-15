import {Column} from "typeorm";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateExpenseDto {

    @IsNotEmpty()
    expenseDate: string;

    @IsNotEmpty()
    expenseName: string;

    @IsOptional()
    @IsNotEmpty()
    expenseBody: string;

    @IsNotEmpty()
    expenseAmount: number;
}