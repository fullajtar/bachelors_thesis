import {EntityRepository, getConnection, Repository} from "typeorm";
import {Company} from "./company.entity";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Company)
export class CompanyRepository extends  Repository<Company> {

    async getMyCompany(user: User): Promise<Company> {
        const query = this.createQueryBuilder('company')
            .where('company.id = :userId', {userId: user.company.id});
        return await query.getOne();
    }

    async createMyCompany(
        user: User,
        createCompanyDto: CreateCompanyDto,
    ): Promise<Company> {
        const {
            supplierName,
            street,
            postCode,
            town,
            country,
            supplierFoundedIn,
            supplierIco,
            supplierDic,
            supplierBank,
            supplierSwift,
            supplierIcDph,
            supplierRegister,
            supplierPayingTax,
            bankAccountNumber,
            iban,
        } = createCompanyDto;
        const company = new Company();

        company.supplierName = supplierName;
        company.street = street;
        company.postCode = postCode;
        company.town = town;
        company.country = country;
        company.supplierFoundedIn = supplierFoundedIn;
        company.supplierIco = supplierIco;
        company.supplierDic = supplierDic;
        company.supplierBank = supplierBank;
        company.supplierSwift = supplierSwift;
        company.supplierIcDph = supplierIcDph;
        company.supplierRegister = supplierRegister;
        company.supplierPayingTax = supplierPayingTax;
        company.bankAccountNumber = bankAccountNumber;
        company.iban = iban;
        company.user = [user]; //TODO create decorator @get user and add company to user, not user to company

        await getConnection().manager.save(company);

        return company;
    }

}