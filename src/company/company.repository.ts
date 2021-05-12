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
            supplierIcDph,
            supplierRegister,
            supplierPayingTax,
            supplierBank1,
            bankAccountNumber1,
            iban1,
            supplierBank2,
            bankAccountNumber2,
            iban2,
            supplierBank3,
            bankAccountNumber3,
            iban3,
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
        company.supplierIcDph = supplierIcDph;
        company.supplierRegister = supplierRegister;
        company.supplierPayingTax = supplierPayingTax;
        company.supplierBank1 = supplierBank1;
        company.bankAccountNumber1 = bankAccountNumber1;
        company.iban1 = iban1;

        company.supplierBank2 = supplierBank2;
        company.bankAccountNumber2 = bankAccountNumber2;
        company.iban2 = iban2;

        company.supplierBank3 = supplierBank3;
        company.bankAccountNumber3 = bankAccountNumber3;
        company.iban3 = iban3;

        //relations
        company.user = [user]; //TODO create decorator @get user and add company to user, not user to company

        await getConnection().manager.save(company);

        return company;
    }

}