import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Render, Res,
    Session,
    ValidationPipe
} from "@nestjs/common";
import {InvoicesService} from "./invoices.service";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {InvoicePatchValidationPipe} from "./pipes/invoice-patch-validation.pipe";
import {GetInvoicesFilterDto} from "./dto/get-invoices-filter.dto";
import {Invoice} from "./invoice.entity";
import {InvoicePaymentEnum} from "./invoice-payment.enum";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {CreateInvoiceItemListDto} from "../invoiceItems/dto/create-invoiceItemList.dto";
import {ItemService} from "../Items/item.service";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {Company} from "../company/company.entity";
import {CompanyService} from "../company/company.service";
import {CustomerService} from "../customer/customer.service";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";
import {GenerateInvoiceFromOrderDto} from "./dto/generate-invoice-from-order.dto";

@Controller('invoices')
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
    async getInvoices(
        @Session() session: Record<string, any>,
        @Res() res,
        @Query(ValidationPipe) filterDto: GetInvoicesFilterDto,
    ): Promise<Invoice[] | {url:string, status:number}> {
        if (session.userid){
            const company = this.getUsersCompany(session.userid);
            return this.invoicesService.getInvoices(await company, filterDto);
        }
        return res.redirect('/auth');
    }

    @Get('/create')
    @Render('invoices/create-invoice.hbs')
    async createInvoiceForm(
        @Session() session: Record<string, any>,
        @Res() res,
    ):Promise<Invoice | {url:string, status:number}>{
        if (session.userid){
            const invoice = new Invoice();
            invoice.company = await this.companyService.getMyCompany(session.userid);
            invoice.invoiceNumber = await this.invoicesService.getNewInvoiceNumber();
            return invoice;
        }
        return res.redirect('/auth');
    }

    @Post('/create')
    //@UsePipes(ValidationPipe) //TODO google wtf is this for
    @Render('invoices/invoice-detail.hbs')
    async createInvoice(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        // @GetUser() user: User,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice | {url:string, status:number}> {
        if (session.userid){
            const company = await this.companyService.getMyCompany(session.userid);
            const customer = await this.customerService.createCustomer(company, createCustomerDto);
            const invoice :Invoice = await this.invoicesService.createInvoice(company, paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, customer);
            invoice.company = company;
            return invoice;
        }
        return res.redirect('/auth');
    }

    @Post('/generate')
    @Render('invoices/create-invoice.hbs')
    async generateInvoiceFromOrder(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() generateInvoiceFromOrderDto: GenerateInvoiceFromOrderDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice | {url:string, status:number}> {
        if (session.userid){
            const company = await this.companyService.getMyCompany(session.userid);
            const customer = await this.customerService.createCustomer(company, createCustomerDto);
            const invoice = await this.invoicesService.generateInvoiceFromOrder(company, paymentMethod ,generateInvoiceFromOrderDto, createItemDto, createInvoiceItemListDto, customer);
            invoice.invoiceNumber = await this.invoicesService.getNewInvoiceNumber();
            invoice.company = company;
            return invoice;
        }
        return res.redirect('/auth');

    }

    @Post('/:invoiceId')
    @Render('invoices/invoice-detail.hbs')
    async addItemToInvoice(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Param('invoiceId', ParseIntPipe) invoiceId: number,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.invoicesService.updateInvoiceProperties(company,invoiceId , paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, createCustomerDto);
        }
        return res.redirect('/auth');
    }

    @Get('/:id')
    @Render('invoices/invoice-detail.hbs')
    async getInvoiceById(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Invoice | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.invoicesService.getInvoiceById(company, id);
        }
        return res.redirect('/auth');
    }

    @Delete('/:id')
    async deleteInvoice(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.invoicesService.deleteInvoice(company, id);
        }
        return res.redirect('/auth');
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }

}
