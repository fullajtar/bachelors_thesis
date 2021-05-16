import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {Company} from "./company/company.entity";
import {Invoice} from "./invoices/invoice.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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


}
