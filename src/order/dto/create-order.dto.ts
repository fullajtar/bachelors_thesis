import {IsIBAN, IsNotEmpty, IsOptional} from "class-validator";
import {Column} from "typeorm";

export class CreateOrderDto {

    @IsNotEmpty()
    dateOfIssue: Date; //datum vystavenia

    @IsNotEmpty()
    currency: string;

//optional
    @IsOptional()
    @IsNotEmpty()
    orderName: string;

    @IsNotEmpty()
    bank: string;

    @IsOptional()
    @IsNotEmpty()
    bankAccountNumber: string; //cislo uctu

    @IsOptional()
    @IsNotEmpty()
    @IsIBAN()
    iban: string;

    @IsOptional()
    @IsNotEmpty()
    note: string;

    @IsOptional()
    @IsNotEmpty()
    tag: string;

    @IsOptional()
    deposit: number;

    @IsOptional()
    @IsNotEmpty()
    customerTitleBefore: string;

    @IsNotEmpty()
    customerName: string;

    @IsNotEmpty()
    customerSurname: string;

    @IsOptional()
    @IsNotEmpty()
    customerTitleAfter: string;

    @IsNotEmpty()
    deliveryMethod: string;

    @Column()
    paymentMethod: string;

}
