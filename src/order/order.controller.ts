import {OrderService} from "./order.service";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Render, Res, Session} from "@nestjs/common";
import {Order} from "./oder.entity";
import {Company} from "../company/company.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {CreateProductDto} from "../product/dto/create-product.dto";
import {CreateItemDto} from "../item/dto/create-item.dto";
import {CreateCustomerDto} from "../customer/dto/create-customer.dto";
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {CustomerService} from "../customer/customer.service";
import {ProductService} from "../product/product.service";
import {CompanyService} from "../company/company.service";
import {InvoicePatchValidationPipe} from "../invoice/pipes/invoice-patch-validation.pipe";
import {InvoicePaymentEnum} from "../invoice/invoice-payment.enum";
import {EmployeeService} from "../employee/employee.service";

@Controller('order')
export class OrderController{
    constructor(
        private orderService: OrderService,
        private customerService: CustomerService,
        private companyService: CompanyService,
        private invoicesListService: ProductService,
        private employeeService: EmployeeService,
    ) {}



    @Get()
    @Render('orders/orders.hbs')
    async getOrders(
        @Session() session: Record<string, any>,
        @Res() res
    ): Promise<Order[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.orderService.getOrders(company);
        }
        return res.redirect('/auth');
    }



    @Get('/create')
    @Render('orders/create-order.hbs')
    async createOrderForm(
        @Session() session: Record<string, any>,
        @Res() res
    ):Promise<Order | {url:string, status:number}>{
        if (session.userid){
            const order = new Order();
            order.company = await this.companyService.getMyCompany(session.userid);
            order.orderNumber = await this.orderService.getNewOrderNumber();
            return order;
        }
        return res.redirect('/auth');
    }

    @Post('/create')
    @Render('orders/order-detail.hbs')
    async createOrder(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createOrderDto: CreateOrderDto,
        @Body() createInvoiceItemListDto: CreateProductDto,
        @Body() createItemDto: CreateItemDto,
        @Body() createCustomerDto: CreateCustomerDto,
        @Body() createEmployeeDto: CreateEmployeeDto
    ): Promise<Order | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            const customer = await this.customerService.createCustomer(company, createCustomerDto);
            const order = await this.orderService.createOrder(company, createOrderDto, createItemDto, createInvoiceItemListDto, customer);
            order.company = company;
            return order
        }
        return res.redirect('/auth');
    }

    @Get('/:id')
    @Render('orders/order-detail.hbs')
    async getOrderById(
        @Session() session: Record<string, any>,
        @Res() res,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Order | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.orderService.getOrderById(company, id);
        }
        return res.redirect('/auth');
    }

    @Post('/:id')
    @Render('orders/order-detail.hbs')
    async editOrder(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createInvoiceItemListDto: CreateProductDto,
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
                return this.orderService.updateOrderProperties(company,invoiceId , createOrderDto, createItemDto, createInvoiceItemListDto, createCustomerDto);
            }
        }
        return res.redirect('/auth');
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }

}