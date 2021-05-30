import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateCompanyDto {

    @IsNotEmpty()
    companyName: string;

    @IsNotEmpty()
    companyStreet: string;

    @IsNotEmpty()
    companyTown: string;

    @IsNotEmpty()
    companyCountry: string;

    @IsNotEmpty()
    companyZipCode: string;

    @IsNotEmpty()
    companyDateCreated: Date;

    @IsNotEmpty()
    companyIco: string;

    @IsNotEmpty() //10-digit
    companyDic: string;

    @IsOptional()
    @IsNotEmpty()
    companyIcdph: string;

    @IsNotEmpty()
    companyRegister: string;

    @IsOptional()
    @IsNotEmpty()
    companyPayingTax: boolean;

    @IsNotEmpty()
    companyBank1: string;

    @IsNotEmpty()
    companyBankAccountNumber1: string;

    @IsNotEmpty()
    companyIban1: string;

    @IsOptional()
    companyBank2: string;

    @IsOptional()
    companyBankAccountNumber2: string;

    @IsOptional()
    companyIban2: string;

    @IsOptional()
    companyBank3: string;

    @IsOptional()
    companyBankAccountNumber3: string;

    @IsOptional()
    companyIban3: string;
}