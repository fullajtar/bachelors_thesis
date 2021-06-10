import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Invoice} from '../invoice/invoice.entity';
import {Item} from '../item/item.entity';
import {Order} from "../order/oder.entity";

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(
      "decimal", {scale: 2}
  )
  quantity: number;

  @Column(
      "decimal", {scale: 2}
  )
  discount: number;

  @ManyToOne((type) => Item, (item) => item.invoiceItemList, {
    eager: true,
    cascade: true,
  })
  item: Item;

  @ManyToOne((type) => Invoice, (invoice) => invoice.invoiceItemLists, {
    eager: false,
  })
  invoice: Invoice;

  @ManyToOne((type) => Order, (order) => order.invoiceItemLists, {
    eager: false,
  })
  order: Order;
}
