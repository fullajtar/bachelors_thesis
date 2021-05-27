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
            clientName,
            clientStreet,
            clientPostCode,
            clientTown,
            clientCountry,
            clientIco,
            clientDic,
            clientIcDph,
        } = createCustomerDTO;

        const customer = await this.customerRepository.findOne(id);
        customer.clientName = clientName;
        customer.clientStreet =clientStreet;
        customer.clientPostCode = clientPostCode;
        customer.clientTown = clientTown;
        customer.clientCountry = clientCountry;
        customer.clientIco = clientIco;
        customer.clientDic = clientDic;
        customer.clientIcDph = clientIcDph;

        return this.customerRepository.save(customer);
    }


}