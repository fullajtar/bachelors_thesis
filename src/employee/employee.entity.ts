import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "../company/company.entity";

@Entity()
export class Employee extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  degreeBefore: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    nullable: true,
  })
  degreeAfter: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  email: string;

  @ManyToOne(
      type => Company,
      company => company.employees,
      { eager: false },
  )
  company: Company;
}