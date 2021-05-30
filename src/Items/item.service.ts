import {Injectable} from "@nestjs/common";
import {ItemRepository} from "./item.repository";
import {CreateItemDto} from "./dto/create-item.dto";
import {Product} from "../product/product.entity";
import {Item} from "./item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {Company} from "../company/company.entity";

@Injectable()
export class ItemService{
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}


  async addToInvoiceItemList(
    invoiceItemList: Product,
    itemId: Number,
  ): Promise<Item> {
    const item = await this.getItemById(itemId);
    invoiceItemList.item = item;
    await getConnection().manager.save(invoiceItemList);
    return item;
  }


  async getItemById(
      itemId: Number,
  ): Promise<Item>{
    return this.itemRepository.getItemById(itemId);
  }

  async getItems(
      company: Company
  ): Promise<Item[]>{
    return this.itemRepository.getItems(company);
  }

  async createItem(
      company: Company,
      createItemDto: CreateItemDto,
  ): Promise<Item>{
    return this.itemRepository.createItem(company, createItemDto);
  }

  async findDuplicity(
      company: Company,
      createItemDto: CreateItemDto,
  ): Promise<Item>{
    return this.itemRepository.findDuplicity(company, createItemDto);
  }

}