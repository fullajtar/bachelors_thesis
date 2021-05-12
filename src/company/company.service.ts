import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyRepository} from "./company.repository";
import {User} from "../auth/user.entity";
import {Company} from "./company.entity";
import {CreateCompanyDto} from "./dto/create-company.dto";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
    ) {}

    async getMyCompany(
        user: User
    ): Promise<Company> {
        return this.companyRepository.getMyCompany(user);
    }

    async createMyCompany(
        user: User,
        createCompanyDto: CreateCompanyDto,
    ): Promise<Company> {

        return this.companyRepository.createMyCompany(user, createCompanyDto);
    }

    async editMyCompany(
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
        const company = await this.getMyCompany(user);
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

        await company.save()

        return company;
    }

}