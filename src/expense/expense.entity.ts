import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "../company/company.entity";

@Entity()
export class Expense extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
    })
    expenseDate: string;

    @Column()
    expenseName: string;

    @Column()
    expenseBody: string;

    @Column(
        "decimal",
        {scale: 2}
    )
    expenseAmount: number;

    @ManyToOne(
        (type) => Company,
        (company) => company.expenses,
        { eager: true }
    )
    company: Company;

}