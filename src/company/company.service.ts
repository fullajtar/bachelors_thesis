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
            supplierBank,
            supplierSwift,
            supplierIcDph,
            supplierRegister,
            supplierPayingTax,
            bankAccountNumber,
            iban,
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
        company.supplierBank = supplierBank;
        company.supplierSwift = supplierSwift;
        company.supplierIcDph = supplierIcDph;
        company.supplierRegister = supplierRegister;
        company.supplierPayingTax = supplierPayingTax;
        company.bankAccountNumber = bankAccountNumber;
        company.iban = iban;

        await company.save()

        return company;
    }

}