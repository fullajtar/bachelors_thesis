import {IsNotEmpty} from "class-validator";

export class CreateCustomerDto{

    @IsNotEmpty()
    clientName: string;

    @IsNotEmpty()
    clientStreet: string;

    @IsNotEmpty()
    clientPostCode: string;

    @IsNotEmpty()
    clientTown: string;

    @IsNotEmpty()
    clientCountry: string;

    @IsNotEmpty()
    clientIco: number;

    @IsNotEmpty() //10-digit
    clientDic: number;

    @IsNotEmpty()
    clientBank: string;

    @IsNotEmpty()
    clientSwift: string;

    @IsNotEmpty()
    clientIcDph: string;

    @IsNotEmpty()
    clientRegister: string;

    @IsNotEmpty()
    clientPayingTax: string;
}