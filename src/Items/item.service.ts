import {Injectable} from "@nestjs/common";
import {ItemRepository} from "./item.repository";
import {CreateItemDto} from "./dto/create-item.dto";
import {InvoiceItemList} from "../invoiceItems/invoiceItemList.entity";
import {Item} from "./item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {GetItemsFilterDto} from "./dto/get-items-filter.dto";
import {Company} from "../company/company.entity";

@Injectable()
export class ItemService{
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}


  async addToInvoiceItemList(
    invoiceItemList: InvoiceItemList,
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
      company: Company,
      filterDto: GetItemsFilterDto,
  ): Promise<Item[]>{
    return this.itemRepository.getItems(company, filterDto);
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