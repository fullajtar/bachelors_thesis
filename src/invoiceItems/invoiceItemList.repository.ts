import {EntityRepository, Repository} from "typeorm";
import {InvoiceItemList} from "./invoiceItemList.entity";
import {CreateInvoiceItemListDto} from "./dto/create-invoiceItemList.dto";
import {Company} from "../company/company.entity";
import {Item} from "../Items/item.entity";

@EntityRepository(InvoiceItemList)
export class InvoiceItemListRepository extends Repository<InvoiceItemList>{
  async createInvoiceItemList(
    createInvoiceItemListDto: CreateInvoiceItemListDto,
    item: Item,
  ): Promise<InvoiceItemList>{
    const {quantity, discount} = createInvoiceItemListDto;
    const invoiceItemList = new InvoiceItemList();
    invoiceItemList.quantity = quantity;
    invoiceItemList.discount = discount;
    // const order = new Order();
    // order.id = 1;
    // invoiceItemList.order = order;

    //relation
    invoiceItemList.item = item;
    await invoiceItemList.save();
    return invoiceItemList;
  }

  async getListsOfInvoiceById(
      company: Company,
      invoiceId: Number,
  ): Promise <InvoiceItemList[]>{
    const query = this.createQueryBuilder('invoiceItemList');

    query.andWhere('invoiceItemList.invoiceId =:invoiceId', {invoiceId: invoiceId})
    return await query.getMany();
  }




}