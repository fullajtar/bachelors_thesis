import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {Product} from '../product/product.entity';
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    orderNumber: string;

    @Column()
    bank: string;

    @Column()
    bankAccountNumber: string; //cislo uctu

    @Column()
    iban: string;

    @Column()
    paymentMethod: string;

    @Column()
    deliveryMethod: string;

    @Column()
    currency: string;

    @Column()
    dateOfIssue: Date; //datum vystavenia

    @Column({
        nullable: true,
    })
    customerDegreeBefore: string;

    @Column()
    customerName: string;

    @Column()
    customerSurname: string;

    @Column({
        nullable: true,
    })
    customerDegreeAfter: string;

    @Column({
        nullable: true,
    })
    name: string;
    @Column({
        nullable: true,
    })
    tag: string;

    @Column({
        nullable: true,
    })
    note: string;

    @OneToMany(
        (type) => Product,
        (invoiceItemList) => invoiceItemList.order,
        { eager: true },
    )
    invoiceItemLists: Product[];

    @ManyToOne(
        (type) => Company,
        (company) => company.orders,
        { eager: true }
    )
    company: Company;

    @ManyToOne(
        (type) => Customer,
        (customer) => customer.order,
        {eager: true, onDelete: "CASCADE"}
    )
    customer: Customer;
}
