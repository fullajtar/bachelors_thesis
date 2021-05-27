import {EntityRepository, getConnection, Repository} from "typeorm";
import {Customer} from "./customer.entity";
import {Company} from "../company/company.entity";
import {CreateCustomerDto} from "./dto/create-customer.dto";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    async createCustomer(
        company: Company,
        createCustomerDTO: CreateCustomerDto,
    ): Promise<Customer>{
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

        const customer = new Customer();
        customer.clientName = clientName;
        customer.clientStreet =clientStreet;
        customer.clientPostCode = clientPostCode;
        customer.clientTown = clientTown;
        customer.clientCountry = clientCountry;
        customer.clientIco = clientIco;
        customer.clientDic = clientDic;
        customer.clientIcDph = clientIcDph;

        //relation
        customer.clientSupplier = company;

        await  getConnection().manager.save(customer);
        return customer
    }

}