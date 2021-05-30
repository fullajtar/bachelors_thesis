import {EntityRepository, Repository} from "typeorm";
import {Product} from "./product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {Company} from "../company/company.entity";
import {Item} from "../Items/item.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
  async createInvoiceItemList(
    createInvoiceItemListDto: CreateProductDto,
    item: Item,
  ): Promise<Product>{
    const {quantity, discount} = createInvoiceItemListDto;
    const invoiceItemList = new Product();
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
  ): Promise <Product[]>{
    const query = this.createQueryBuilder('invoiceItemList');

    query.andWhere('invoiceItemList.invoiceId =:invoiceId', {invoiceId: invoiceId})
    return await query.getMany();
  }




}