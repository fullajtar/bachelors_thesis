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
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {EmployeeService} from "../employee/employee.service";
import {Company} from "../company/company.entity";
import {CompanyService} from "../company/company.service";
import {CustomerService} from "../customer/customer.service";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";
import {User} from "../auth/user.entity";

@Controller('invoices')
//@UseGuards(AuthGuard())
export class InvoicesController {
    constructor(
        private invoicesService: InvoicesService,
        private invoicesListService: InvoiceItemListsService,
        private itemService: ItemService,
        private employeeService: EmployeeService,
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
    async createInvoiceForm(){ //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        const invoice = new Invoice();
        invoice.company = await this.companyService.getMyCompany(user);
        console.log(invoice)
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
        @Body() createEmployeeDto: CreateEmployeeDto,
        @GetUser() user: Company,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        const customer = await this.customerService.createCustomer(company, createCustomerDto);
        let employee = await this.employeeService.findDuplicity(company, createEmployeeDto);
        if (employee == null){
            employee = await this.employeeService.createEmployee(company, createEmployeeDto);
        }
        return this.invoicesService.createInvoice(company, paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, employee, customer);
    }

    @Post('/:invoiceId')
    @Render('invoices/invoice-detail.hbs')
    async addItemToInvoice(
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createEmployeeDto: CreateEmployeeDto,
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Param('invoiceId', ParseIntPipe) invoiceId: number,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        console.log('DTO: ', createEmployeeDto)
        const customer = await this.customerService.createCustomer(company, createCustomerDto);
        let employee = await this.employeeService.findDuplicity(company, createEmployeeDto);
        if (employee == null){
            employee = await this.employeeService.createEmployee(company, createEmployeeDto);
        }
        return this.invoicesService.updateInvoiceProperties(company,invoiceId , paymentMethod, createInvoiceDto, createItemDto, createInvoiceItemListDto, employee, customer);
    }

    @Get('/:id')
    @Render('invoices/invoice-detail.hbs')
    getInvoiceById(
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
