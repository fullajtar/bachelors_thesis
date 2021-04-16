import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {InvoiceItemList} from '../invoiceItems/invoiceItemList.entity';
import {Employee} from '../employee/employee.entity';
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

    //optional
    @Column()
    orderName: string;

    @Column()
    bankAccountNumber: string; //cislo uctu

    @Column()
    iban: string;

    @Column()
    note: string;

    @Column()
    tag: string;

    @Column()
    customerTitleBefore: string;

    @Column()
    customerName: string;

    @Column()
    customerSurname: string;

    @Column()
    customerTitleAfter: string;

    @Column()
    deliveryMethod: string;

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

    @Column()
    stamp: string;

    @Column()
    signature: string;
}
