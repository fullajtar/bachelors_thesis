import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "../invoice/invoice.entity";
import {Order} from "../order/oder.entity";

@Entity()
export class Customer extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    zipCode: string;

    @Column()
    town: string;

    @Column()
    country: string;

    @Column()
    ico: number;

    @Column() //10-digit
    dic: number;

    @Column()
    icdph: string;

    @OneToMany(
        (type) => Invoice,
        (invoice) => invoice.customer,
        {eager: false, onDelete: "CASCADE"}
    )
    invoice: Invoice;

    @OneToMany(
        (type) => Order,
        (order) => order.customer,
        {eager: false, onDelete: "CASCADE"}
    )
    order: Order;
}