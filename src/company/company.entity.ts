import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "../invoice/invoice.entity";
import {Item} from "../item/item.entity";
import {Employee} from "../employee/employee.entity";
import {User} from "../auth/user.entity";
import {Order} from "../order/oder.entity";
import {Expense} from "../expense/expense.entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    town: string;

    @Column()
    country: string;

    @Column()
    zipCode: string;

    @Column()
    dateCreated: Date;

    @Column()
    ico: string;

    @Column()
    dic: string;

    @Column()
    icdph: string;

    @Column()
    register: string;

    @Column("bool")
    payingTax: boolean;

    @Column()
    bank1: string;

    @Column()
    bankAccountNumber1: string;

    @Column()
    iban1: string;

    @Column({
        nullable: true,
    })
    bank2: string;

    @Column({
        nullable: true,
    })
    bankAccountNumber2: string;

    @Column({
            nullable: true,
    })
    iban2: string;

    @Column({
        nullable: true,
    })
    bank3: string;

    @Column({
        nullable: true,
    })
    bankAccountNumber3: string;

    @Column({
        nullable: true,
    })
    iban3: string;

    @OneToMany(
        (type) => User,
        (user) => user.company,
        {}
    )
    user: User[];

    @OneToMany(
        (type) => Employee,
        (employee) => employee.company,
        {eager: true})
    employees: Employee[];

    @OneToMany(
        (type) => Expense,
        (expense) => expense.company,
        {}
    )
    expenses: Expense[];

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
        (type) => Item,
        (item) => item.company,
        { eager: false })
    items: Item[];





}