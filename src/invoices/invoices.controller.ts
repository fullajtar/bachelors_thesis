import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query, Redirect,
    Render,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
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
import {Item} from "../Items/item.entity";
import {GetItemsFilterDto} from "../Items/dto/get-items-filter.dto";
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {EmployeeService} from "../employee/employee.service";
import {Employee} from "../employee/employee.entity";
import {GetEmployeeFilterDto} from "../employee/dto/get-employee-filter.dto";
import {Company} from "../company/company.entity";
import {CreateCompanyDto} from "../company/dto/create-company.dto";
import {CompanyService} from "../company/company.service";
import {User} from "../auth/user.entity";
import {CustomerService} from "../customer/customer.service";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";


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


    @Get('/create')
    @Render('invoices/create-invoice.hbs')
    createInvoiceForm(){ //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        return;
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
    ): Promise<Invoice> {
        const company = new Company();
        company.id = 1;
        return this.invoicesService.getInvoiceById(company, id);
    }





    @Get('/items/get')
    @Render('items/items.hbs')
    getItems(
        @Query(ValidationPipe) filterDto: GetItemsFilterDto,
    ): Promise<Item[]> {
        const company = new Company();
        company.id = 1;
        return this.itemService.getItems(company, filterDto);
    }



    @Post('/item/create')
    @UsePipes(ValidationPipe)
    CreateItem(
        @Body() createItemDto: CreateItemDto,
    ): Promise<Item> {
        const company = new Company();
        company.id = 1;
        return this.itemService.createItem(company, createItemDto);
    }

    @Delete('/:id')
    deleteInvoice(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        const company = new Company();
        company.id = 1;
        return this.invoicesService.deleteInvoice(company, id);
    }

    @Get('/company/create')
    @Render('company/myCompany.hbs')
    createMyCompanyForm(){
        return;
    }

    @Post('/company/create')
    @Redirect('/invoices')
    @UsePipes(ValidationPipe)
    createMyCompany(
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    ): Promise<Company>{
        const user = new User();
        user.id = 1;
        return this.companyService.createMyCompany(user, createCompanyDto);
    }

    @Get('/company/info')
    @Render('company/editMyCompany.hbs')
    getMyCompany(
        //get user
    ): Promise<Company>{
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        return this.companyService.getMyCompany(user);
    }

    @Post('/company/edit')
    @Render('company/editMyCompany.hbs')
    editMyCompany(
        @Body() createCompanyDto: CreateCompanyDto,
        //get company
    ): Promise<Company> {
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        return this.companyService.editMyCompany(user, createCompanyDto);
    }
// WITHOUT RENDER PAGES--------------------------

    // EMPLOYEE---------------------------------------------------------------------------------------------
    @Post('/employee/post')
    @UsePipes(ValidationPipe)
    createEmployee(
        @Body() createEmployeeDto: CreateEmployeeDto,
    ): Promise<Employee> {
        const company = new Company();
        company.id = 1;
        return this.employeeService.createEmployee(company, createEmployeeDto);
    }


    @Get('/employee/get')
    @Render('employee/employees.hbs')
    getEmployees(
        @Query(ValidationPipe) filterDto: GetEmployeeFilterDto,
    ): Promise<Employee[]> {
        const company = new Company();
        company.id = 1;
        return this.employeeService.getEmployees(company, filterDto);
    }

}
