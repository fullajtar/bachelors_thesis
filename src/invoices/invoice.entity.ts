import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {InvoicePaymentEnum} from './invoice-payment.enum';
import {Product} from '../product/product.entity';
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";

@Entity()
export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    invoiceNumber: string;

    @Column()
    bank: string;

    @Column()
    bankAccountNumber: string;

    @Column()
    iban: string;

    @Column()
    paymentMethod: InvoicePaymentEnum;

    @Column()
    deliveryMethod: string;

    @Column()
    currency: string;

    @Column({
        nullable: true,
    })
    variableSymbol: string;

    @Column({
        nullable: true,
    })
    constantSymbol: string;

    @Column({
        nullable: true,
    })
    specificSymbol: string;

    @Column()
    dateOfIssue: Date;

    @Column({
        nullable: true,
    })
    deliveryDate: Date;

    @Column({
        nullable: true,
    })
    dueDate: Date;

    @Column({
        nullable: true,
    })
    issuedDegreeBefore: string;

    @Column({
        nullable: true,
    })
    issuedName: string;

    @Column({
        nullable: true,
    })
    issuedSurname: string;

    @Column({
        nullable: true,
    })
    issuedDegreeAfter: string;

    @Column({
        nullable: true,
    })
    issuedPhone: string; //TODO number type

    @Column({
        nullable: true,
    })
    issuedEmail: string;

    @Column({
        nullable: true,
    })
    pickedUpDegreeBefore: string;

    @Column({
        nullable: true,
    })
    pickedUpName: string;

    @Column({
        nullable: true,
    })
    pickedUpSurname: string;

    @Column({
        nullable: true,
    })
    pickedUpDegreeAfter: string;

    @Column({
        nullable: true,
        type: "decimal",
        scale: 2,
    })
    deposit: number;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    tag: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    paidDate: string;

    @Column({
        nullable: true,
    })
    note: string;

    @OneToMany(
        (type) => Product,
        (invoiceItemList) => invoiceItemList.invoice,
        { eager: true },
    )
    invoiceItemLists: Product[];

    @ManyToOne(
        (type) => Company,
        (company) => company.invoices,
        { eager: true }
    )
    company: Company;

    @ManyToOne(
        (type) => Customer,
        (customer) => customer.invoice,
        {eager: true, onDelete: "CASCADE"}
    )
    customer: Customer;
}
