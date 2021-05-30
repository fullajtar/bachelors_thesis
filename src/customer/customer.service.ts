import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CustomerRepository} from "./customer.repository";
import {Company} from "../company/company.entity";
import {CreateCustomerDto} from "./dto/create-customer.dto";
import {Customer} from "./customer.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ) {}

    async createCustomer(
        company: Company,
        createCustomerDTO: CreateCustomerDto,
    ): Promise <Customer>{
        return this.customerRepository.createCustomer(company, createCustomerDTO);
    }

    async editCustomer(
        id: number,
        createCustomerDTO: CreateCustomerDto
    ): Promise <Customer>{
        const{
            customerName,
            customerStreet,
            customerZipCode,
            customerTown,
            customerCountry,
            customerIco,
            customerDic,
            customerIcDph,
        } = createCustomerDTO;

        const customer = await this.customerRepository.findOne(id);
        customer.name = customerName;
        customer.street =customerStreet;
        customer.zipCode = customerZipCode;
        customer.town = customerTown;
        customer.country = customerCountry;
        customer.ico = customerIco;
        customer.dic = customerDic;
        customer.icdph = customerIcDph;

        return this.customerRepository.save(customer);
    }


}