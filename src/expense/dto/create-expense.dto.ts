import {IsNotEmpty, IsOptional} from "class-validator";
import multer from "multer";

export class CreateExpenseDto {

    @IsNotEmpty()
    expenseName: string;

    @IsNotEmpty()
    expenseDate: string;

    @IsNotEmpty()
    expenseAmount: number;

    @IsOptional()
    @IsNotEmpty()
    expenseNote: string;

    @IsOptional()
    @IsNotEmpty()
    expenseFileName: string;
}