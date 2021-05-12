import {OrderService} from "./order.service";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Render} from "@nestjs/common";
import {Order} from "./oder.entity";
import {Company} from "../company/company.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {CreateInvoiceItemListDto} from "../invoiceItems/dto/create-invoiceItemList.dto";
import {CreateItemDto} from "../Items/dto/create-item.dto";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {GetUser} from "../auth/get-user.decorator";
import {CustomerService} from "../customer/customer.service";
import {InvoiceItemListsService} from "../invoiceItems/invoiceItemLists.service";
import {User} from "../auth/user.entity";
import {Invoice} from "../invoices/invoice.entity";
import {CompanyService} from "../company/company.service";

@Controller('order')
export class OrderController{
    constructor(
        private orderService: OrderService,
        private customerService: CustomerService,
        private companyService: CompanyService,
        private invoicesListService: InvoiceItemListsService,
    ) {}
    @Get()
    @Render('orders/orders.hbs')
    getOrders(
    ): Promise<Order[]> {
        console.log('controller')
        const company = new Company();
        company.id = 1;
        return this.orderService.getOrders(company); //.then((result) => result ? { invoices: result } : { invoices: [] } );
    }



    @Get('/create')
    @Render('orders/create-order.hbs')
    async createOrderForm(){ //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        const user = new User();
        user.id = 1;
        const company = new Company();
        company.id = 1;
        user.company = company;
        const invoice = new Invoice();
        invoice.company = await this.companyService.getMyCompany(user);
        return invoice;
    }
    @Post('/create')
    //@UsePipes(ValidationPipe)
    @Render('orders/order-detail.hbs')
    async createOrder( //TODO fixnut bug, pri vytvarani faktury nezobrazi detail o company
        @Body() createOrderDto: CreateOrderDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createEmployeeDto: CreateEmployeeDto,
        @GetUser() user: Company,
    ): Promise<Order> {
        console.log('controller1')
        const company = new Company();
        company.id = 1;
        const customer = await this.customerService.createCustomer(company, createCustomerDto);

        return this.orderService.createOrder(company, createOrderDto, createItemDto, createInvoiceItemListDto, customer);
    }

    @Get('/:id')
    @Render('orders/order-detail.hbs')
    async getOrderById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Order> { //TODO: vracat aj entitu company aby sa zobrazovali zakladne udaje
        const company = new Company();
        company.id = 1;
        console.log(await this.orderService.getOrderById(company, id));
        return this.orderService.getOrderById(company, id);
    }

}