import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Invoice} from '../invoices/invoice.entity';
import {Item} from '../Items/item.entity';

@Entity()
export class InvoiceItemList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Invoice, (invoice) => invoice.invoiceItemLists, {
    eager: false,
  })
  invoice: Invoice;

  // @ManyToOne((type) => Order, (order) => order.invoiceItemLists, {
  //   eager: false,
  // })
  // order: Order;

  @Column()
  quantity: number;

  @Column()
  discount: number;

  @ManyToOne((type) => Item, (item) => item.invoiceItemList, {
    eager: true,
    cascade: true,
  })
  item: Item;

  /*
    @OneToMany(type => InvoiceItemList, invoiceItemList => invoiceItemList.invoice, { eager: true })
  invoiceItemLists: InvoiceItemList[];
   */
}
