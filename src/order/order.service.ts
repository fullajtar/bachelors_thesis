import {Injectable, NotFoundException} from "@nestjs/common";
import {ItemService} from "../Items/item.service";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderRepository} from "./order.repository";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {Company} from "../company/company.entity";
import {Order} from "./oder.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {CreateInvoiceItemListDto} from "../invoiceItems/dto/create-invoiceItemList.dto";
import {Customer} from "../customer/customer.entity";
import {Between, getRepository} from "typeorm";
import {CustomerService} from "../customer/customer.service";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";


@Injectable()
export class OrderService {
    //private invoiceItemListsService: InvoiceItemListsService;
    private itemService: ItemService;
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
        private invoiceItemListsService:  InvoiceItemListsService,
        private customerService: CustomerService
    ) {}

    async getOrders(
        company: Company,
    ): Promise<Order[]> {
        return this.orderRepository.getOrders(company);
    }

    async getOrderById(
        company: Company,
        id: number,
    ): Promise<Order> {
        const found = await this.orderRepository.findOne({ where: { id, company: company.id } });
        if (!found) {
            throw new NotFoundException(`Invoice with ID "${id}" not found`);
        }
        return found;
    }

    async createOrder(
        company: Company,
        createInvoiceDto: CreateOrderDto,
        createItemDto: CreateItemDto,
        createInvoiceItemListDto: CreateInvoiceItemListDto,
        customer: Customer,
    ): Promise<Order> {
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
        return this.orderRepository.createOrder(company, createInvoiceDto, itemLists, customer); //add item lists
    }

    async deleteOrder(
        company: Company,
        id: number,
    ): Promise<void> {
        const result = await this.orderRepository.delete({ id, company : company}); //TODO not sure about this syntax, might not work

        if (result.affected === 0) {
            throw new NotFoundException(`Invoice with ID "${id}" not found`);
        }
    }

    async updateOrderProperties(
        company: Company,
        id: number,
        createOrderDto: CreateOrderDto,
        createItemDto: CreateItemDto,
        createInvoiceItemListDto: CreateInvoiceItemListDto,
        createCustomerDto: CreateCustomerDto
    ): Promise<Order> {
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



        const order= await this.getOrderById(company, id);


        const {
            currency,
            orderName,
            bank,
            bankAccountNumber,
            iban,
            note,
            tag,
            dateOfIssue,
            deliveryMethod,
            customerTitleBefore,
            customerName,
            customerSurname,
            customerTitleAfter,
            paymentMethod,
            orderNumber,
        } = createOrderDto;

        //properties
        order.dateOfIssue = dateOfIssue;
        order.currency = currency;
        order.orderName = orderName;
        order.bank = bank;
        order.bankAccountNumber = bankAccountNumber;
        order.iban = iban;
        order.note = note;
        order.tag = tag;
        order.deliveryMethod = deliveryMethod;
        order.customerTitleBefore = customerTitleBefore;
        order.customerName = customerName;
        order.customerSurname = customerSurname;
        order.customerTitleAfter = customerTitleAfter;
        order.paymentMethod = paymentMethod;
        order.orderNumber = orderNumber;


        //relations
        if (order.customer && order.customer.customerOrders == null){
            order.customer = await this.customerService.editCustomer(order.customer.id, createCustomerDto);
        }
        if (order.invoiceItemLists[0] != null && order.invoiceItemLists[0].invoice == null){ //TODO: ZMENIT Z TYPU invoiceItemLists[] na invoiceItemList
            this.invoiceItemListsService.deleteArray(order.invoiceItemLists); //not necessary await imo
        }
        order.invoiceItemLists = itemLists;

        await order.save();
        return order;
    }

    async getNewOrderNumber():Promise<string>{
        const n = new Date().getFullYear();
        const thisYear = await this.orderRepository.count({
            where: {
                dateOfIssue: Between(n+'-01-01  00:00:00.000000', n+'-12-31  23:59:59.000000')
            }
        })
        return thisYear+1+'/'+n;
    }
}
