import {IsNotEmpty} from "class-validator";

export class CreateCustomerDto{

    @IsNotEmpty()
    customerName: string;

    @IsNotEmpty()
    customerStreet: string;

    @IsNotEmpty()
    customerZipCode: string;

    @IsNotEmpty()
    customerTown: string;

    @IsNotEmpty()
    customerCountry: string;

    @IsNotEmpty()
    customerIco: number;

    @IsNotEmpty() //10-digit
    customerDic: number;

    @IsNotEmpty()
    customerIcDph: string;
}