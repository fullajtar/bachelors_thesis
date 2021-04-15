import {Invoice} from "./invoice.entity";
import {EntityRepository, getConnection, Repository} from "typeorm";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {GetInvoicesFilterDto} from "./dto/get-invoices-filter.dto";
import {InvoicePaymentEnum} from "./invoice-payment.enum";
import {Employee} from "../employee/employee.entity";
import {Company} from "../company/company.entity";
import {Customer} from "../customer/customer.entity";
import {InvoiceItemList} from "../invoiceItems/invoiceItemList.entity";

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
    readonly allowedStatuses = [
        InvoicePaymentEnum.CASH,
        InvoicePaymentEnum.POST_COUPON,
        InvoicePaymentEnum.PROMISSORY_NOTE,
        InvoicePaymentEnum.TRANSFER,
    ];

    async getInvoices(
        company: Company,
        filterDto: GetInvoicesFilterDto,
    ): Promise<Invoice[]> {
        const { search } = filterDto;

        const query = this.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.issuedBy','employee')
            .leftJoinAndSelect('invoice.invoiceItemLists', 'invoiceItemList')
            .leftJoinAndSelect('invoiceItemList.item','item');


        query.where('invoice.companyId = :companyId', { companyId: company.id});

        if (search) {
            query.andWhere( '(invoice.paymentMethod LIKE :search ' +
                //'OR invoice.dateOfIssue LIKE :search ' + //TODO
                //'OR invoice.dueDate LIKE :search ' +
                //'OR invoice.deliveryDate LIKE :search ' +
                'OR invoice.paymentMethod LIKE :search ' +
                'OR invoice.currency LIKE :search ' +
                //'OR invoice.issuedBy.name LIKE :search ' + //TODO test postman
                'OR invoice.invoiceName LIKE :search ' +
                'OR invoice.bankNumber LIKE :search ' +
                'OR invoice.iban LIKE :search ' +
                'OR invoice.variableSymbol LIKE :search ' +
                'OR invoice.specificSymbol LIKE :search ' +
                'OR invoice.constantSymbol LIKE :search ' +
                'OR invoice.body LIKE :search ' +
                'OR invoice.note LIKE :search)' , { search: `%${search}%` });
        }
        query.orderBy('invoice.id');
        return await query.getMany();

    }

    async createInvoice(
        company: Company,
        paymentMethod: InvoicePaymentEnum,
        createInvoiceDto: CreateInvoiceDto,
        issuedBy: Employee,
        customer: Customer,
        itemLists: InvoiceItemList[],
    ): Promise<Invoice> {

        const {
            currency,
            invoiceName,
            bankAccountNumber,
            iban,
            variableSymbol,
            specificSymbol,
            constantSymbol,
            body,
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
        } = createInvoiceDto;

        const invoice = new Invoice();

        //properties
        invoice.dateOfIssue = dateOfIssue;
        invoice.dueDate = dueDate;
        invoice.deliveryDate = deliveryDate;
        invoice.paymentMethod = paymentMethod;
        invoice.currency = currency;
        invoice.invoiceName = invoiceName;
        invoice.bankAccountNumber = bankAccountNumber;
        invoice.iban = iban;
        invoice.variableSymbol = variableSymbol;
        invoice.specificSymbol = specificSymbol;
        invoice.constantSymbol = constantSymbol;
        invoice.body = body;
        invoice.note = note;
        invoice.deposit = deposit;
        invoice.deliveryMethod = deliveryMethod;
        invoice.pickedUpByTitleBefore = pickedUpByTitleBefore;
        invoice.pickedUpByName = pickedUpByName;
        invoice.pickedUpBySurname = pickedUpBySurname;
        invoice.pickedUpByTitleAfter = pickedUpByTitleAfter;


        //relations
        invoice.company = company;
        invoice.issuedBy = issuedBy;
        invoice.customer = customer;
        invoice.invoiceItemLists = itemLists;

        await getConnection().manager.save(invoice);
        return invoice;
    }

}
