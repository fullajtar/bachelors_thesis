import {IsIBAN, IsNotEmpty, IsOptional} from "class-validator";
import {Column} from "typeorm";

export class CreateOrderDto {

    @IsNotEmpty()
    orderNumber: string

    @IsNotEmpty()
    bank: string;

    @IsOptional()
    @IsNotEmpty()
    bankAccountNumber: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIBAN()
    iban: string;

    @Column()
    paymentMethod: string;

    @IsNotEmpty()
    deliveryMethod: string;

    @IsNotEmpty()
    currency: string;

    @IsNotEmpty()
    dateOfIssue: Date;

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

    @IsOptional()
    @IsNotEmpty()
    orderName: string;

    @IsOptional()
    @IsNotEmpty()
    tag: string;

    @IsOptional()
    @IsNotEmpty()
    note: string;
}
