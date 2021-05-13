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

    @Column({
        nullable: true,
    })
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
    @Column({
        nullable: true,
    })
    invoiceName: string;

    @Column()
    bank: string;

    @Column()
    bankAccountNumber: string; //cislo uctu

    @Column()
    iban: string;

    @Column({
        nullable: true,
    })
    variableSymbol: string;

    @Column({
        nullable: true,
    })
    specificSymbol: string;

    @Column({
        nullable: true,
    })
    constantSymbol: string;

    @Column({
        nullable: true,
    })
    tag: string;

    @Column({
        nullable: true,
    })
    note: string;

    @Column({
        nullable: true,
        type: "decimal",
        scale: 2,
    })
    deposit: number;

    @Column({
        nullable: true,
    })
    pickedUpByTitleBefore: string;

    @Column({
        nullable: true,
    })
    pickedUpByName: string;

    @Column({
        nullable: true,
    })
    pickedUpBySurname: string;

    @Column({
        nullable: true,
    })
    pickedUpByTitleAfter: string;

    @Column()
    deliveryMethod: string;

    @Column({
        nullable: true,
    })
    invoiceNumber: string;

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
