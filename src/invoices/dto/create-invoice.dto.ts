import {IsIBAN, IsNotEmpty, IsOptional, MaxLength} from "class-validator";

export class CreateInvoiceDto {

    @IsNotEmpty()
    dateOfIssue: Date; //datum vystavenia

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    deliveryDate: Date;

    @IsNotEmpty()
    currency: string;

//optional
    @IsOptional()
    @IsNotEmpty()
    invoiceName: string;

    @IsOptional()
    @IsNotEmpty()
    bankAccountNumber: string; //cislo uctu

    @IsOptional()
    @IsNotEmpty()
    @IsIBAN()
    iban: string;

    @IsOptional()
    @IsNotEmpty()
    @MaxLength(10)
    variableSymbol: string;

    @IsOptional()
    @IsNotEmpty()
        //@IsInt()
        //@Min(0)
        //@MaxLength(10)
        //specificSymbol: number;
    specificSymbol: string;

    @IsOptional()
    @IsNotEmpty()
        //@IsInt()
        //@Min(0)
        //@Max(9999)
        //constantSymbol: number;
    constantSymbol: string;

    @IsOptional()
    @IsNotEmpty()
    tag: string;

    @IsOptional()
    @IsNotEmpty()
    note: string;

    @IsOptional()
    deposit: number;

    @IsOptional()
    @IsNotEmpty()
    pickedUpByTitleBefore: string;

    @IsNotEmpty()
    pickedUpByName: string;

    @IsNotEmpty()
    pickedUpBySurname: string;

    @IsOptional()
    @IsNotEmpty()
    pickedUpByTitleAfter: string;

    @IsNotEmpty()
    deliveryMethod: string;






}
