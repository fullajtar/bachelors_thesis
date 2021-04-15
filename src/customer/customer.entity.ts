import {BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "../company/company.entity";
import {Invoice} from "../invoices/invoice.entity";

@Entity()
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => Company,
        (company) => company.customers,
        {eager: false}
    )
    clientSupplier: Company;

    @OneToMany(
        (type) => Invoice,
        (invoice) => invoice.customer,
        {eager: false}
    )
    clientOrders: Invoice[];

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
/*
    @Column()
    clientBank: string;

    @Column()
    clientSwift: string;
*/
    @Column()
    clientIcDph: string;
/*
    @Column()
    clientRegister: string;

    @Column()
    clientPayingTax: string;

 */
}