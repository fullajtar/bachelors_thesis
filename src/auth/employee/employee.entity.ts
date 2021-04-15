import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "../../invoices/invoice.entity";
import {Company} from "../../company/company.entity";

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
  
  @OneToMany((type) => Invoice, (invoice) => invoice.issuedBy, { eager: false })
  invoicesIssued: Invoice[];

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string; //TODO number type

  @Column()
  email: string;

  @Column()
  degreeBeforeName: string;

  @Column()
  degreeAfterName: string;
}