import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Product} from '../product/product.entity';
import {Company} from "../company/company.entity";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column(
      "decimal", {scale: 2}
  )
  priceWithoutTax: number;

  @Column(
      "decimal", {scale: 2}
  )
  tax: number;

  @Column()
  unit: string;

  @Column()
  body: string;

  @Column()
  note: string;

  @OneToMany(
      (type) => Product,
      (invoiceItemList) => invoiceItemList.item,
      { eager: false },
  )
  invoiceItemList: Product[];

  @ManyToOne((type) => Company, (company) => company.items, { eager: false })
  company: Company;
}
