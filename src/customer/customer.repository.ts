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
            customerName,
            customerStreet,
            customerZipCode,
            customerTown,
            customerCountry,
            customerIco,
            customerDic,
            customerIcDph,
        } = createCustomerDTO;

        const customer = new Customer();
        customer.name = customerName;
        customer.street =customerStreet;
        customer.zipCode = customerZipCode;
        customer.town = customerTown;
        customer.country = customerCountry;
        customer.ico = customerIco;
        customer.dic = customerDic;
        customer.icdph = customerIcDph;

        //relation
        //customer.clientSupplier = company;

        await  getConnection().manager.save(customer);
        return customer
    }

}