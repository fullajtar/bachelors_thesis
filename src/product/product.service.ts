import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductRepository} from "./product.repository";
import {Product} from "./product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {Company} from "../company/company.entity";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {ItemService} from "../Items/item.service";

@Injectable()
export class ProductService {

  constructor(
      @InjectRepository(ProductRepository)
      private invoiceItemListRepository: ProductRepository,
      private itemService: ItemService,
  ) {
  }


  async createInvoiceItemList(
      company: Company,
      createInvoiceItemListDto: CreateProductDto,
      createItemDto: CreateItemDto,
  ): Promise<Product> {
    let item = await this.itemService.findDuplicity(company, createItemDto);
    if (item == null) {
      item = await this.itemService.createItem(company, createItemDto);
    }
    return this.invoiceItemListRepository.createInvoiceItemList(createInvoiceItemListDto, item);
  }

  async getListsOfInvoiceById(
      company: Company,
      invoiceId: Number,
  ): Promise<Product[]> {
    return this.invoiceItemListRepository.getListsOfInvoiceById(company, invoiceId);
  }

  async getInvoiceItemListById(
      invoiceId: number,
      id: number,
  ): Promise<Product> {
    const found = await this.invoiceItemListRepository.findOne({where: {id, invoice: invoiceId}});
    if (!found) {
      throw new NotFoundException(`Invoice with ID "${id}" or item list with ID "${invoiceId}" not found`);
    }

    return found;
  }

  async deleteArray(
      invoiceItemLists: Product[]
  ): Promise<void> {
    for (let i = 0; i < invoiceItemLists.length; i++) {
      await this.invoiceItemListRepository.delete(invoiceItemLists[i].id)
    }
  }
}