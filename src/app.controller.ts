import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {Company} from "./company/company.entity";
import {Invoice} from "./invoices/invoice.entity";
import {CompanyService} from "./company/company.service";

@Controller() //TODO ADD SESSIONS SOMEHOW
export class AppController {
  constructor(
      private readonly appService: AppService,
      private companyService: CompanyService,
  ) {}

  @Get()
  @Render('dashBoard.hbs')
  getHello(): Company {
    const company = new Company();
    company.supplierName = "Jozo";
    company.id = 1;
    return company;
  }

  @Get('/data/dashboard')
  getDataDashboard() :Promise<any> {  //:Promise <Map<string, number>> {
    const company = new Company();
    company.id = 1;
    return this.appService.getDataDashboard(company);
  }

  private async getUsersCompany(
      userId: number
  ) :Promise <Company>{
    return  this.companyService.getMyCompany(userId);
  }


}
