import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "../company/company.entity";

@Entity()
export class Expense extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'date',
    })
    date: string;

    @Column(
        "decimal",
        {scale: 2}
    )
    amount: number;

    @Column()
    note: string;

    @Column(
        {nullable: true}
    )
    fileName: string;

    @ManyToOne(
        (type) => Company,
        (company) => company.expenses,
        { eager: true }
    )
    company: Company;

}