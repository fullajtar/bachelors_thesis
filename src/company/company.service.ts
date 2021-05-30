import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyRepository} from "./company.repository";
import {User} from "../auth/user.entity";
import {Company} from "./company.entity";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {getRepository} from "typeorm";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
    ) {}

    async getMyCompany(
        userId: number
    ): Promise<Company> {
        const user = await getRepository(User).findOne({ where: { id: userId } } );
        return this.companyRepository.findOne({where: { id :user.company.id}});
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
        let {companyPayingTax} = createCompanyDto;
        if  (companyPayingTax == undefined){
            companyPayingTax = false;
        }
        const company = await this.getMyCompany(user.id);
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

        await company.save()

        return company;
    }
}