import {Controller, Get, Render, Session} from '@nestjs/common';
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
  async getDataDashboard(
      @Session() session: Record<string, any>
  ) :Promise<any> {  //:Promise <Map<string, number>> {
    console.log(session)
    if (session.userid){
      const company = await this.getUsersCompany(session.userid)
      return this.appService.getDataDashboard(company);
    }
    return;

  }

  private async getUsersCompany(
      userId: number
  ) :Promise <Company>{
    return  this.companyService.getMyCompany(userId);
  }


}
