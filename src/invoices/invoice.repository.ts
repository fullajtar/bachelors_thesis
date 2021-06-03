import {Invoice} from "./invoice.entity";
import {EntityRepository, getConnection, Repository} from "typeorm";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {InvoicePaymentEnum} from "./invoice-payment.enum";
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";
import {Product} from "../product/product.entity";
import {GenerateInvoiceFromOrderDto} from "./dto/generate-invoice-from-order.dto";

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
    readonly allowedStatuses = [
        InvoicePaymentEnum.CASH,
        InvoicePaymentEnum.POST_COUPON,
        InvoicePaymentEnum.PROMISSORY_NOTE,
        InvoicePaymentEnum.TRANSFER,
        InvoicePaymentEnum.CARD,
    ];

    async getInvoices(
        company: Company
    ): Promise<Invoice[]> {
        const query = this.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.invoiceItemLists', 'invoiceItemList')
            .leftJoinAndSelect('invoiceItemList.item','item')
            .where('invoice.companyId = :companyId', { companyId: company.id})
            .orderBy('invoice.dateOfIssue');
        return await query.getMany();
    }

    async createInvoice(
        company: Company,
        paymentMethod: InvoicePaymentEnum,
        createInvoiceDto: CreateInvoiceDto,
        customer: Customer,
        itemLists: Product[],
    ): Promise<Invoice> {

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
            deliveryDate,
            dueDate,
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

        const invoice = new Invoice();
        let {paidDate} = createInvoiceDto;
        if (paidDate === ""){
            paidDate = null;
        }
        //properties
        invoice.dateOfIssue = dateOfIssue;
        invoice.dueDate = dueDate;
        invoice.deliveryDate = deliveryDate;
        invoice.paymentMethod = paymentMethod;
        invoice.currency = currency;
        invoice.name = invoiceName;
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
        invoice.pickedUpDegreeBefore = pickedUpByTitleBefore;
        invoice.pickedUpName = pickedUpByName;
        invoice.pickedUpSurname = pickedUpBySurname;
        invoice.pickedUpDegreeAfter = pickedUpByTitleAfter;
        invoice.invoiceNumber = invoiceNumber;
        invoice.issuedName =  issuedByName;
        invoice.issuedSurname = issuedBySurname;
        invoice.issuedPhone = issuedByPhoneNumber;
        invoice.issuedEmail = issuedByEmail;
        invoice.issuedDegreeBefore = issuedByDegreeBeforeName;
        invoice.issuedDegreeAfter = issuedByDegreeAfterName;
        invoice.paidDate = paidDate;

        //relations
        invoice.company = company;
        // invoice.issuedBy = issuedBy;
        invoice.customer = customer;
        invoice.invoiceItemLists = itemLists;

        await getConnection().manager.save(invoice);
        return invoice;
    }

    async generateInvoiceFromOrder(
        company: Company,
        paymentMethod: InvoicePaymentEnum,
        generateInvoiceFromOrderDto: GenerateInvoiceFromOrderDto,
        customer: Customer,
        itemLists: Product[],
    ): Promise<Invoice> {

        const {
            currency,
            orderName,
            bank,
            bankAccountNumber,
            iban,
            tag,
            note,
            dateOfIssue,
            deliveryMethod,
        } = generateInvoiceFromOrderDto;

        const invoice = new Invoice();

        //properties
        invoice.dateOfIssue = dateOfIssue;
        invoice.dueDate = null;
        invoice.deliveryDate = null;
        invoice.paymentMethod = paymentMethod;
        invoice.currency = currency;
        invoice.name = orderName;
        invoice.bank = bank;
        invoice.bankAccountNumber = bankAccountNumber;
        invoice.iban = iban;
        invoice.variableSymbol = null;
        invoice.specificSymbol = null;
        invoice.constantSymbol = null;
        invoice.tag = tag;
        invoice.note = note;
        invoice.deposit = null;
        invoice.deliveryMethod = deliveryMethod;
        invoice.pickedUpDegreeBefore = null;
        invoice.pickedUpName = null;
        invoice.pickedUpSurname = null;
        invoice.pickedUpDegreeAfter = null;


        //relations
        invoice.company = company;
        // invoice.issuedBy = issuedBy;
        invoice.customer = customer;
        invoice.invoiceItemLists = itemLists;

        //await getConnection().manager.save(invoice);
        return invoice;
    }
}
