import {Controller, Get, Render, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {Company} from "./company/company.entity";
import {CompanyService} from "./company/company.service";
import * as url from "url";

@Controller() //TODO ADD SESSIONS SOMEHOW
export class AppController {
  constructor(
      private readonly appService: AppService,
      private companyService: CompanyService,
  ) {}

  @Get()
  @Render('dashBoard.hbs')
  async getDashboard(
      @Session() session: Record<string, any>
  ): Promise<{url:string, status:number}> {
    if (session.userid){
      return
    }
    return { url: '/auth', status: 401}; //TODO redirect not working
  }

  @Get('/data/dashboard')
  async getDataDashboard(
      @Session() session: Record<string, any>
  ) :Promise<any> {  //:Promise <Map<string, number>> {
    if (session.userid){
      const company = await this.getUsersCompany(session.userid)
      return this.appService.getDataDashboard(company);
    }
    return;
  }

  @Get('/session/username')
  getUsername(
      @Session() session: Record<string, any>
  ) :string {
    return session.username
  }

  private async getUsersCompany(
      userId: number
  ) :Promise <Company>{
    return  this.companyService.getMyCompany(userId);
  }


}
