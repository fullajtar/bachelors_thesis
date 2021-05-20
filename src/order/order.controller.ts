import {OrderService} from "./order.service";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Render, Session} from "@nestjs/common";
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
import {CompanyService} from "../company/company.service";
import {InvoicePatchValidationPipe} from "../invoices/pipes/invoice-patch-validation.pipe";
import {InvoicePaymentEnum} from "../invoices/invoice-payment.enum";
import {EmployeeService} from "../employee/employee.service";

@Controller('order')
export class OrderController{
    constructor(
        private orderService: OrderService,
        private customerService: CustomerService,
        private companyService: CompanyService,
        private invoicesListService: InvoiceItemListsService,
        private employeeService: EmployeeService,
    ) {}



    @Get()
    @Render('orders/orders.hbs')
    async getOrders(
        @Session() session: Record<string, any>,
    ): Promise<Order[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.orderService.getOrders(company);
        }
        return { url: '/auth', status: 401};
    }



    @Get('/create')
    @Render('orders/create-order.hbs')
    async createOrderForm(
        @Session() session: Record<string, any>,
    ):Promise<Order | {url:string, status:number}>{
        if (session.userid){
            const order = new Order();
            order.company = await this.companyService.getMyCompany(session.userid);
            order.orderNumber = await this.orderService.getNewOrderNumber();
            return order;
        }
        return { url: '/auth', status: 401};
    }

    @Post('/create')
    @Render('orders/order-detail.hbs')
    async createOrder(
        @Session() session: Record<string, any>,
        @Body() createOrderDto: CreateOrderDto,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createEmployeeDto: CreateEmployeeDto,
        @GetUser() user: Company,
    ): Promise<Order | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            const customer = await this.customerService.createCustomer(company, createCustomerDto);
            const order = await this.orderService.createOrder(company, createOrderDto, createItemDto, createInvoiceItemListDto, customer);
            order.company = company;
            return order
        }
        return { url: '/auth', status: 401};
    }

    @Get('/:id')
    @Render('orders/order-detail.hbs')
    async getOrderById(
        @Session() session: Record<string, any>,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Order | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.orderService.getOrderById(company, id);
        }
        return { url: '/auth', status: 401};
    }

    @Post('/:id')
    @Render('orders/order-detail.hbs')
    async editOrder(
        @Session() session: Record<string, any>,
        @Body() createInvoiceItemListDto: CreateInvoiceItemListDto, //TODO optimize body
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createEmployeeDto: CreateEmployeeDto,
        @Body() createOrderDto: CreateOrderDto,
        @Param('id', ParseIntPipe) invoiceId: number,
        @Body('paymentMethod', InvoicePatchValidationPipe) paymentMethod: InvoicePaymentEnum,
    ): Promise<Order | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            if (createEmployeeDto["action"] == "save"){
                return this.orderService.updateOrderProperties(company,invoiceId , createOrderDto, createItemDto, createInvoiceItemListDto);
            }
        }
        return { url: '/auth', status: 401};
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }

}