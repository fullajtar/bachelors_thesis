import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "../invoices/invoice.entity";
import {Customer} from "../customer/customer.entity";
import {Item} from "../Items/item.entity";
import {Employee} from "../employee/employee.entity";
import {User} from "../auth/user.entity";
import {Order} from "../order/oder.entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierName: string;

    @Column()
    street: string;

    @Column()
    postCode: string;

    @Column()
    town: string;

    @Column()
    country: string;

    @Column()
    supplierFoundedIn: Date;

    @Column()
    supplierIco: number;

    @Column()
    supplierDic: number;

    @Column()
    supplierBank: string;

    @Column()
    bankAccountNumber: string;

    @Column()
    supplierSwift: string;

    @Column()
    supplierIcDph: string;

    @Column()
    supplierRegister: string;

    @Column()
    supplierPayingTax: string;

    @Column()
    iban: string;

    @OneToMany(
        (type) => Invoice,
        (invoice) => invoice.company,
        {}
        )
    invoices: Invoice[];

    @OneToMany(
        (type) => Order,
        (order) => order.company,
        {}
    )
    orders: Order[];


    @OneToMany(
        (type) => User,
        (user) => user.company,
        {}
    )
    user: User[];

    @OneToMany(
        (type) => Customer,
        (customer) => customer.clientSupplier,
        { eager: false }
    )
    customers: Customer[];

    @OneToMany(
        (type) => Item,
        (item) => item.company,
        { eager: false })
    items: Item[];

    @OneToMany(
        (type) => Employee,
        (employee) => employee.company,
        {eager: false})
    employees: Employee[];

}