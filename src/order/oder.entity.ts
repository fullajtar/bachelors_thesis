import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {InvoiceItemList} from '../invoiceItems/invoiceItemList.entity';
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateOfIssue: Date; //datum vystavenia


    @Column()
    currency: string;

    @Column({
        nullable: true,
    })
    orderName: string;

    @Column()
    bank: string;

    @Column()
    bankAccountNumber: string; //cislo uctu

    @Column()
    iban: string;

    @Column({
        nullable: true,
    })
    note: string;

    @Column({
        nullable: true,
    })
    tag: string;

    @Column({
        nullable: true,
    })
    customerTitleBefore: string;

    @Column()
    customerName: string;

    @Column()
    customerSurname: string;

    @Column({
        nullable: true,
    })
    customerTitleAfter: string;

    @Column()
    paymentMethod: string;

    @Column()
    deliveryMethod: string;

    @Column({
        nullable: true,
    })
    orderNumber: string;

    @OneToMany( //TODO edit services of itemLists
        (type) => InvoiceItemList,
        (invoiceItemList) => invoiceItemList.order,
        { eager: true },
    )
    invoiceItemLists: InvoiceItemList[];

    @ManyToOne( //TODO edit services of company
        (type) => Company,
        (company) => company.orders,
        { eager: true }
    )
    company: Company;

    @ManyToOne(
        (type) => Customer,
        (customer) => customer.customerOrders,
        {eager: true, onDelete: "CASCADE"}
    )
    customer: Customer;
}
