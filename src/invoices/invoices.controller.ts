import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Render, ValidationPipe} from "@nestjs/common";
import {InvoicesService} from "./invoices.service";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {InvoicePatchValidationPipe} from "./pipes/invoice-patch-validation.pipe";
import {GetInvoicesFilterDto} from "./dto/get-invoices-filter.dto";
import {Invoice} from "./invoice.entity";
import {GetUser} from "src/auth/get-user.decorator";
import {InvoicePaymentEnum} from "./invoice-payment.enum";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {CreateInvoiceItemListDto} from "../invoiceItems/dto/create-invoiceItemList.dto";
import {ItemService} from "../Items/item.service";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {Company} from "../company/company.entity";
import {CompanyService} from "../company/company.service";
import {CustomerService} from "../customer/customer.service";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";
import {User} from "../auth/user.entity";
import {GenerateInvoiceFromOrderDto} from "./dto/generate-invoice-from-order.dto";

@Controller('invoices')
//@UseGuards(AuthGuard())
export class InvoicesController {
    constructor(
        private invoicesService: InvoicesService,
        private invoicesListService: InvoiceItemListsService,
        private itemService: ItemService,
        private companyService: CompanyService,
        private customerService: CustomerService,
    ) {}

    @Get()
    @Render('invoices/invoices.hbs')
    getInvoices(
        @Query(ValidationPipe) filterDto: GetInvoicesFilterDto,
    ): Promise<Invoice[]> {
        const company = new Company();
        company.id = 1;
        return this.invoicesService.getInvoices(company, filterDto); //.then((result) => result ? { invoices: result } : { invoices: [] } );
    }
    @Get('/create')
    @Render('invoices/create-invoice.hbs')
    async createInvoiceForm():Promise<Invoice>{ //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        const invoice = new Invoice();
        invoice.company = await this.companyService.getMyCompany(user);
        invoice.invoiceNumber = await this.invoicesService.getNewInvoiceNumber();
        return invoice;
    }

    @Post('/create')
    //@UsePipes(ValidationPipe)
    @Render('invoices/invoice-detail.hbs')
    async createInvoice( //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @GetUser() user: Company,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        const customer = await this.customerService.createCustomer(company, createCustomerDto);
        return this.invoicesService.createInvoice(company, paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, customer);
    }

    @Post('/generate')
    //@UsePipes(ValidationPipe)
    @Render('invoices/create-invoice.hbs')
    async generateInvoiceFromOrder( //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        @Body() generateInvoiceFromOrderDto: GenerateInvoiceFromOrderDto,
        // @Body() createInvoiceDto: CreateInvoiceDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @GetUser() user: User, //TODO make it work and get company with this user
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        const customer = await this.customerService.createCustomer(company, createCustomerDto);
        const invoice = await this.invoicesService.generateInvoiceFromOrder(company, paymentMethod ,generateInvoiceFromOrderDto, createItemDto, createInvoiceItemListDto, customer);
        invoice.invoiceNumber = await this.invoicesService.getNewInvoiceNumber();
        invoice.company = company; //TODO get this company
        return invoice;
    }

    @Post('/:invoiceId')
    @Render('invoices/invoice-detail.hbs')
    async addItemToInvoice(
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Param('invoiceId', ParseIntPipe) invoiceId: number,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        const customer = await this.customerService.createCustomer(company, createCustomerDto);
        return this.invoicesService.updateInvoiceProperties(company,invoiceId , paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, customer);
    }

    @Get('/:id')
    @Render('invoices/invoice-detail.hbs')
    async getInvoiceById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Invoice> { //TODO: vracat aj entitu company aby sa zobrazovali zakladne udaje
        const company = new Company();
        company.id = 1;
        return this.invoicesService.getInvoiceById(company, id);
    }

    @Delete('/:id')
    deleteInvoice(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        const company = new Company();
        company.id = 1;
        return this.invoicesService.deleteInvoice(company, id);
    }


}
