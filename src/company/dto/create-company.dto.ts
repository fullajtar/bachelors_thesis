import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateCompanyDto {

    @IsNotEmpty()
    supplierName: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    postCode: string;

    @IsNotEmpty()
    town: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    supplierFoundedIn: Date;

    @IsNotEmpty()
    supplierIco: number;

    @IsNotEmpty() //10-digit
    supplierDic: number;

    @IsOptional()
    @IsNotEmpty()
    supplierBank: string;

    @IsNotEmpty()
    supplierSwift: string;

    @IsOptional()
    @IsNotEmpty()
    supplierIcDph: string;

    @IsNotEmpty()
    supplierRegister: string;

    @IsNotEmpty()
    supplierPayingTax: string;

    @IsNotEmpty()
    iban: string;

    @IsNotEmpty()
    bankAccountNumber: string;
}