import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "../invoices/invoice.entity";
import {Company} from "../company/company.entity";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Company,
    company => company.employees,
    { eager: false },
  )
  company: Company;
  
  // @OneToMany((type) => Invoice, (invoice) => invoice.issuedBy, { eager: false })
  // invoicesIssued: Invoice[];

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    nullable: true,
  })
  degreeBeforeName: string;

  @Column({
    nullable: true,
  })
  degreeAfterName: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string; //TODO number type

  @Column({
    nullable: true,
  })
  email: string;
}