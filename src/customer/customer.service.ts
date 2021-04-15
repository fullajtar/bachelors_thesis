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


}