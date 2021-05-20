import {Order} from "./oder.entity";
import {EntityRepository, getConnection, Repository} from "typeorm";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";
import {InvoiceItemList} from "../invoiceItems/invoiceItemList.entity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

    async getOrders(
        company: Company,
    ): Promise<Order[]> {
        const query = this.createQueryBuilder('order')
            .leftJoinAndSelect('order.invoiceItemLists', 'invoiceItemList')
            .leftJoinAndSelect('invoiceItemList.item','item');

        query.where('order.companyId = :companyId', { companyId: company.id});

        query.orderBy('order.orderNumber');
        return await query.getMany();

    }

    async createOrder(
        company: Company,
        createOrderDto: CreateOrderDto,
        itemLists: InvoiceItemList[],
        customer: Customer,
    ): Promise<Order> {
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

        const order = new Order();

        //properties
        order.dateOfIssue = dateOfIssue;
        order.currency = currency;
        order.orderName = orderName;
        order.bankAccountNumber = bankAccountNumber;
        order.bank = bank;
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
        order.company = company;
        order.invoiceItemLists = itemLists;
        order.customer = customer;

        await getConnection().manager.save(order);
        return order;
    }

}
