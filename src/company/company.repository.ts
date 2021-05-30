import {EntityRepository, getConnection, Repository} from "typeorm";
import {Company} from "./company.entity";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {User} from "../auth/user.entity";

@EntityRepository(Company)
export class CompanyRepository extends  Repository<Company> {

    async getMyCompany(user: User): Promise<Company> {
        return await this.findOne({
            where: {id: user.company.id}
        });
    }

    async createMyCompany(
        user: User,
        createCompanyDto: CreateCompanyDto,
    ): Promise<Company> {
        const {
            companyName,
            companyStreet,
            companyZipCode,
            companyTown,
            companyCountry,
            companyDateCreated,
            companyIco,
            companyDic,
            companyIcdph,
            companyRegister,
            companyBank1,
            companyBankAccountNumber1,
            companyIban1,
            companyBank2,
            companyBankAccountNumber2,
            companyIban2,
            companyBank3,
            companyBankAccountNumber3,
            companyIban3,
        } = createCompanyDto;
        const company = new Company();
        let {companyPayingTax} = createCompanyDto;
        if  (companyPayingTax == undefined){
            companyPayingTax = false;
        }
        company.name = companyName;
        company.street = companyStreet;
        company.zipCode = companyZipCode;
        company.town = companyTown;
        company.country = companyCountry;
        company.dateCreated = companyDateCreated;
        company.ico = companyIco;
        company.dic = companyDic;
        company.icdph = companyIcdph;
        company.register = companyRegister;
        company.payingTax = companyPayingTax;
        company.bank1 = companyBank1;
        company.bankAccountNumber1 = companyBankAccountNumber1;
        company.iban1 = companyIban1;

        company.bank2 = companyBank2;
        company.bankAccountNumber2 = companyBankAccountNumber2;
        company.iban2 = companyIban2;

        company.bank3 = companyBank3;
        company.bankAccountNumber3 = companyBankAccountNumber3;
        company.iban3 = companyIban3;

        //relations
        company.user = [user]; //TODO create decorator @get user and add company to user, not user to company

        await getConnection().manager.save(company);

        return company;
    }

}