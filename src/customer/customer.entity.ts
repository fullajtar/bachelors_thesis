import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "../company/company.entity";
import {Invoice} from "../invoices/invoice.entity";
import {Order} from "../order/oder.entity";

@Entity()
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => Company,
        (company) => company.customers,
        {eager: false, onDelete: "CASCADE"}
    )
    clientSupplier: Company;

    @OneToMany(
        (type) => Invoice,
        (invoice) => invoice.customer,
        {eager: false, onDelete: "CASCADE"}
    )
    clientOrders: Invoice[]; //TODO retardovany nazov premennej -> zmenit

    @OneToMany(
        (type) => Order,
        (order) => order.customer,
        {eager: false, onDelete: "CASCADE"}
    )
    customerOrders: Order[]; //TODO retardovany nazov premennej -> zmenit

    @Column()
    clientName: string;

    @Column()
    clientStreet: string;

    @Column()
    clientPostCode: string;

    @Column()
    clientTown: string;

    @Column()
    clientCountry: string;

    @Column()
    clientIco: number;

    @Column() //10-digit
    clientDic: number;

    @Column()
    clientIcDph: string;
}