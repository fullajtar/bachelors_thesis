import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {InvoiceItemList} from '../invoiceItems/invoiceItemList.entity';
import {Company} from "../company/company.entity";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => InvoiceItemList,
    (invoiceItemList) => invoiceItemList.item,
    { eager: false },
  )
  invoiceItemList: InvoiceItemList[];

  @ManyToOne((type) => Company, (company) => company.items, { eager: false })
  company: Company;

  @Column()
  itemName: string;

  @Column()
  itemBarcode: string;

  @Column(
      "decimal", {scale: 2}
  )
  itemPriceWithoutTax: number;

  @Column()
  itemUnit: string;

  @Column(
      "decimal", {scale: 2}
  )
  itemTax: number;

  @Column()
  itemBody: string;

  @Column()
  itemNote: string;
}
