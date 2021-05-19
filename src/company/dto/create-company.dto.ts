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
    supplierIco: string;

    @IsNotEmpty() //10-digit
    supplierDic: string;

    @IsOptional()
    @IsNotEmpty()
    supplierIcDph: string;

    @IsNotEmpty()
    supplierRegister: string;

    @IsOptional()
    @IsNotEmpty()
    supplierPayingTax: boolean;





    @IsNotEmpty()
    supplierBank1: string;

    @IsNotEmpty()
    bankAccountNumber1: string;

    @IsNotEmpty()
    iban1: string;

    @IsOptional()
    supplierBank2: string;

    @IsOptional()
    bankAccountNumber2: string;

    @IsOptional()
    iban2: string;

    @IsOptional()
    supplierBank3: string;

    @IsOptional()
    bankAccountNumber3: string;

    @IsOptional()
    iban3: string;



}