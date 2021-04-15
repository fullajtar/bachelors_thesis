import {EntityRepository, getConnection, Repository} from "typeorm";
import {Customer} from "./customer.entity";
import {Company} from "../company/company.entity";
import {GetCustomersFilterDto} from "./dto/get-customers-filter.dto";
import {CreateCustomerDto} from "./dto/create-customer.dto";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
    async getCustomers(
        company: Company,
        filterDto: GetCustomersFilterDto,
    ): Promise<Customer[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('customer')
            .where('customer.supplierId = :companyId', {companyId: company.id});

        if (search) {
            query.andWhere('(customer.name LIKE :search)', { search: `%${search}%` });
        }

        return await query.getMany();
    }

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
           // clientBank,
          //  clientSwift,
            clientIcDph,
          //  clientRegister,
           // clientPayingTax,
        } = createCustomerDTO;

        const customer = new Customer();
        customer.clientName = clientName;
        customer.clientStreet =clientStreet;
        customer.clientPostCode = clientPostCode;
        customer.clientTown = clientTown;
        customer.clientCountry = clientCountry;
        customer.clientIco = clientIco;
        customer.clientDic = clientDic;
       // customer.clientBank = clientBank;
       // customer.clientSwift = clientSwift;
        customer.clientIcDph = clientIcDph;
       // customer.clientRegister = clientRegister;
       // customer.clientPayingTax = clientPayingTax;

        customer.clientSupplier = company;

        await  getConnection().manager.save(customer);
        return customer
    }

}