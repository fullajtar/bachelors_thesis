import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {GetInvoicesFilterDto} from "./dto/get-invoices-filter.dto";
import {InvoiceRepository} from "./invoice.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Invoice} from "./invoice.entity";
import {InvoicePaymentEnum} from "./invoice-payment.enum";
import {Employee} from "../employee/employee.entity";
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {CreateInvoiceItemListDto} from "../invoiceItems/dto/create-invoiceItemList.dto";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {ItemService} from "../Items/item.service";
import {GenerateInvoiceFromOrderDto} from "./dto/generate-invoice-from-order.dto";
import {Between, getConnection, MoreThan} from "typeorm";

@Injectable()
export class InvoicesService {
    //private invoiceItemListsService: InvoiceItemListsService;
    private itemService: ItemService;
    constructor(
        @InjectRepository(InvoiceRepository)
        private invoiceRepository: InvoiceRepository,
        private invoiceItemListsService:  InvoiceItemListsService,
    ) {}

    async getInvoices(
        company: Company,
        filterDto: GetInvoicesFilterDto,
    ): Promise<Invoice[]> {
        return this.invoiceRepository.getInvoices(company, filterDto);
    }

    async getInvoiceById(
        company: Company,
        id: number,
    ): Promise<Invoice> {
        const found = await this.invoiceRepository.findOne({ where: { id, company: company.id } });
        if (!found) {
            throw new NotFoundException(`Invoice with ID "${id}" not found`);
        }
        return found;
    }

    async createInvoice(
        company: Company,
        paymentMethod: InvoicePaymentEnum,
        createInvoiceDto: CreateInvoiceDto,
        createItemDto: CreateItemDto,
        createInvoiceItemListDto: CreateInvoiceItemListDto,
        customer: Customer,
    ): Promise<Invoice> {
        const itemLists = await this.processInvoiceItemList(createInvoiceItemListDto, createItemDto, company);
        return this.invoiceRepository.createInvoice(company, paymentMethod, createInvoiceDto, customer, itemLists); //add item lists
    }

    async generateInvoiceFromOrder(
        company: Company,
        paymentMethod: InvoicePaymentEnum,
        generateInvoiceFromOrderDto: GenerateInvoiceFromOrderDto,
        createItemDto: CreateItemDto,
        createInvoiceItemListDto: CreateInvoiceItemListDto,
        customer: Customer,
    ): Promise<Invoice> {
        const itemLists = await this.processInvoiceItemList(createInvoiceItemListDto, createItemDto, company);
        return this.invoiceRepository.generateInvoiceFromOrder(company, paymentMethod, generateInvoiceFromOrderDto, customer, itemLists); //add item lists
    }

    async deleteInvoice(
        company: Company,
        id: number,
    ): Promise<void> {
        const result = await this.invoiceRepository.delete({ id, company : company}); //TODO not sure about this syntax, might not work

        if (result.affected === 0) {
            throw new NotFoundException(`Invoice with ID "${id}" not found`);
        }
    }

    async updateInvoiceProperties(
        company: Company,
        id: number,
        status: InvoicePaymentEnum,
        createInvoiceDto: CreateInvoiceDto,
        createItemDto: CreateItemDto,
        createInvoiceItemListDto: CreateInvoiceItemListDto,
        customer: Customer,
    ): Promise<Invoice> {
        const itemLists = await this.processInvoiceItemList(createInvoiceItemListDto, createItemDto, company);
        const invoice = await this.getInvoiceById(company, id);
        const {
            currency,
            invoiceName,
            bank,
            bankAccountNumber,
            iban,
            variableSymbol,
            specificSymbol,
            constantSymbol,
            tag,
            note,
            dateOfIssue,
            dueDate,
            deliveryDate,
            deposit,
            deliveryMethod,
            pickedUpByTitleBefore,
            pickedUpByName,
            pickedUpBySurname,
            pickedUpByTitleAfter,
            invoiceNumber,
            issuedByName,
            issuedBySurname,
            issuedByPhoneNumber,
            issuedByEmail,
            issuedByDegreeBeforeName,
            issuedByDegreeAfterName,

        } = createInvoiceDto;

        //properties
        invoice.paymentMethod = status;
        invoice.dateOfIssue = dateOfIssue;
        invoice.dueDate = dueDate;
        invoice.deliveryDate = deliveryDate;
        invoice.currency = currency;
        invoice.invoiceName = invoiceName;
        invoice.bank = bank;
        invoice.bankAccountNumber = bankAccountNumber;
        invoice.iban = iban;
        invoice.variableSymbol = variableSymbol;
        invoice.specificSymbol = specificSymbol;
        invoice.constantSymbol = constantSymbol;
        invoice.tag = tag;
        invoice.note = note;
        invoice.deposit = deposit;
        invoice.deliveryMethod = deliveryMethod;
        invoice.pickedUpByTitleBefore = pickedUpByTitleBefore;
        invoice.pickedUpByName = pickedUpByName;
        invoice.pickedUpBySurname = pickedUpBySurname;
        invoice.pickedUpByTitleAfter = pickedUpByTitleAfter;
        invoice.invoiceNumber = invoiceNumber;
        invoice.issuedByName =  issuedByName;
        invoice.issuedBySurname = issuedBySurname;
        invoice.issuedByPhoneNumber = issuedByPhoneNumber;
        invoice.issuedByEmail = issuedByEmail;
        invoice.issuedByDegreeBeforeName = issuedByDegreeBeforeName;
        invoice.issuedByDegreeAfterName = issuedByDegreeAfterName;

        //relations
        // invoice.issuedBy = issuedBy;
        invoice.customer = customer;
        if  (invoice.invoiceItemLists[0] === undefined || invoice.invoiceItemLists[0].order === null){ //TODO: ZMENIT Z TYPU invoiceItemLists[] na invoiceItemList
            this.invoiceItemListsService.deleteArray(invoice.invoiceItemLists); //not necessary await imo
        }

        invoice.invoiceItemLists = itemLists;

        await invoice.save();
        return invoice;
    }

    private async processInvoiceItemList(
        createInvoiceItemListDto,
        createItemDto,
        company
    ){
        let itemLists = [];
        if (createItemDto.itemName != null){
            let addedItemsCount = createItemDto.itemName.length;
            for (let i =0; i<addedItemsCount; i++){
                let newItemDto = new CreateItemDto();
                newItemDto.itemName = createItemDto.itemName[i];
                newItemDto.itemTax = createItemDto.itemTax[i];
                newItemDto.itemPriceWithoutTax = createItemDto.itemPriceWithoutTax[i];
                newItemDto.itemUnit = createItemDto.itemUnit[i];
                newItemDto.itemNote = createItemDto.itemNote[i];
                newItemDto.itemBody =createItemDto.itemBody[i];
                newItemDto.itemBarcode = createItemDto.itemBarcode[i];

                let newInvoiceItemListDto = new CreateInvoiceItemListDto();
                newInvoiceItemListDto.discount = createInvoiceItemListDto.discount[i];
                newInvoiceItemListDto.quantity = createInvoiceItemListDto.quantity[i];

                if (! Array.isArray(createItemDto.itemName)) {
                    newItemDto = createItemDto;
                    newInvoiceItemListDto = createInvoiceItemListDto;
                    i = addedItemsCount; //prevent saving multiple items if there is only 1 (if saving only one item 'i' represents length of string, not array)
                }
                const item = await this.invoiceItemListsService.createInvoiceItemList( company, newInvoiceItemListDto, newItemDto );
                itemLists.push(item);
            }
        }
        return itemLists;
    }

    async getNewInvoiceNumber():Promise<string>{
        const n = new Date().getFullYear();
        const thisYear = await this.invoiceRepository.count({
            where: {
                dateOfIssue: Between(n+'-01-01  00:00:00.000000', n+'-12-31  23:59:59.000000')
            }
        })
        return thisYear+1+'/'+n;
    }
}
