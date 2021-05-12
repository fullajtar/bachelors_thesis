import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {InvoicePaymentEnum} from './invoice-payment.enum';
import {InvoiceItemList} from '../invoiceItems/invoiceItemList.entity';
import {Employee} from '../employee/employee.entity';
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";

@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateOfIssue: Date; //datum vystavenia

    @Column()
    dueDate: Date;

    @Column({
        nullable: true,
    })
    deliveryDate: Date;

    @Column()
    paymentMethod: InvoicePaymentEnum;

    @Column()
    currency: string;

    //optional
    @Column()
    invoiceName: string;

    @Column()
    bankAccountNumber: string; //cislo uctu

    @Column()
    iban: string;

    @Column()
    variableSymbol: string;

    @Column()
        //specificSymbol: number;
    specificSymbol: string;

    @Column()
        //constantSymbol: number;
    constantSymbol: string;

    @Column()
    tag: string;

    @Column()
    note: string;

    @Column(
        "decimal", {scale: 2}
    )
    deposit: number;

    @Column()
    pickedUpByTitleBefore: string;

    @Column()
    pickedUpByName: string;

    @Column()
    pickedUpBySurname: string;

    @Column()
    pickedUpByTitleAfter: string;

    @Column()
    deliveryMethod: string;

    @OneToMany(
        (type) => InvoiceItemList,
        (invoiceItemList) => invoiceItemList.invoice,
        { eager: true },
    )
    invoiceItemLists: InvoiceItemList[];

    @ManyToOne(
        (type) => Company,
        (company) => company.invoices,
        { eager: true }
    )
    company: Company;

    @ManyToOne((type) => Employee, (employee) => employee.invoicesIssued, {
        eager: true,
    })
    issuedBy: Employee;

    @ManyToOne(
        (type) => Customer,
        (customer) => customer.clientOrders,
        {eager: true}
    )
    customer: Customer;
}
