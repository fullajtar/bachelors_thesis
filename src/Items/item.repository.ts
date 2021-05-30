import {EntityRepository, Repository} from "typeorm";
import {Item} from "./item.entity";
import {CreateItemDto} from "./dto/create-item.dto";
import {Company} from "../company/company.entity";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{
  async getItemById(
      itemId: Number,
  ): Promise<Item> {
    const query = this.createQueryBuilder('item');
    query.where('item.id = :itemId',{itemId: itemId});

    return await query.getOne();

  }

  async getItems(
      company: Company,
  ): Promise<Item[]> {
    return await this.find({
      where: {company: company.id}
    })
  }

  async createItem(
      company: Company,
      createItemDto: CreateItemDto,
  ): Promise<Item>{
    const { itemName, itemBarcode, itemBody, itemNote, itemPriceWithoutTax, itemTax, itemUnit  } = createItemDto;
    const item = new Item();

    //properties
    item.barcode = itemBarcode;
    item.body = itemBody;
    item.name = itemName;
    item.note = itemNote;
    item.priceWithoutTax = itemPriceWithoutTax;
    item.tax = itemTax;
    item.unit = itemUnit;

    //relations
    item.company = company;

    await item.save();
    delete item.invoiceItemList;
    delete item.company;
    return item;
  }

  async findDuplicity(
      company: Company,
      createItemDto: CreateItemDto,
  ): Promise<Item>{
    const {
      itemName,
      itemUnit,
      itemPriceWithoutTax,
      itemTax,
      itemBarcode,
    } = createItemDto;

    const query = this.createQueryBuilder('item');
    query.where('item.companyId = :companyId', { companyId: company.id });

    query.andWhere('item.itemName = :name', {name: itemName});
    query.andWhere('item.itemUnit = :unit', {unit: itemUnit});
    query.andWhere('item.itemPriceWithoutTax = :priceWithoutTax', {priceWithoutTax: itemPriceWithoutTax});
    query.andWhere('item.itemTax = :tax', {tax: itemTax});
    query.andWhere('item.itemBarcode = :barcode', {barcode: itemBarcode});
    return await query.getOne();
  }
}