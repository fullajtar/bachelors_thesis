import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InvoiceItemListRepository} from "./invoiceItemList.repository";
import {Invoice} from "../invoices/invoice.entity";
import {InvoiceItemList} from "./invoiceItemList.entity";
import {CreateInvoiceItemListDto} from "./dto/create-invoiceItemList.dto";
import {Company} from "../company/company.entity";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {Item} from "../Items/item.entity";
import {ItemService} from "../Items/item.service";

@Injectable()
export class InvoiceItemListsService{

  constructor(
    @InjectRepository(InvoiceItemListRepository)
    private invoiceItemListRepository: InvoiceItemListRepository,
    private itemService: ItemService,
  ) {}


  async createInvoiceItemList(
      company: Company,
      createInvoiceItemListDto: CreateInvoiceItemListDto,
      createItemDto: CreateItemDto,
  ): Promise<InvoiceItemList>{
    let item = await this.itemService.findDuplicity(company, createItemDto);
    if (item == null){
      item = await this.itemService.createItem(company, createItemDto);
    }
    return this.invoiceItemListRepository.createInvoiceItemList(createInvoiceItemListDto, item);
  }

  async getListsOfInvoiceById(
      company: Company,
      invoiceId: Number,
  ): Promise <InvoiceItemList[]>{
    return this.invoiceItemListRepository.getListsOfInvoiceById(company, invoiceId);
  }

  async getInvoiceItemListById(
    invoiceId: number,
    id: number,
  ): Promise<InvoiceItemList> {
    const found = await this.invoiceItemListRepository.findOne({ where: { id, invoice: invoiceId } });
    if (!found) {
      throw new NotFoundException(`Invoice with ID "${id}" or item list with ID "${invoiceId}" not found`);
    }

    return found;
  }

  async deleteArray(
      invoiceItemLists: InvoiceItemList[]
  ):Promise<void>{
    invoiceItemLists.forEach( entity => {


    })
    const result = await this.invoiceItemListRepository.remove(invoiceItemLists);

  }

}