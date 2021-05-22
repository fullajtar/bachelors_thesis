import {IsNotEmpty, IsOptional} from "class-validator";
import multer from "multer";

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