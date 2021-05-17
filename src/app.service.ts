import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InvoiceRepository} from "./invoices/invoice.repository";
import {InvoiceItemListsService} from "./invoiceItems/invoiceItemLists.service";
import {Company} from "./company/company.entity";
import {Invoice} from "./invoices/invoice.entity";
import {Between, Not} from "typeorm";
import {type} from "os";
import any = jasmine.any;
import {ExpenseRepository} from "./expense/expense.repository";
import {ItemRepository} from "./Items/item.repository";
import {Expense} from "./expense/expense.entity";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(InvoiceRepository)
      private invoiceRepository: InvoiceRepository,
      private expenseRepository: ExpenseRepository
  ) {}

  async getDataDashboard(
      company: Company
  ) :Promise <string> {
      const n = new Date().getFullYear();
      const invoices = this.invoiceRepository.find(
        {
            where: {
                company: company.id,
                //dueDate: Between(n+'-04-01  00:00:00.000000', n+1+'-3-31  23:59:59.000000'),
                paidDate: Between(n+'-04-01  00:00:00.000000', n+1+'-3-31  23:59:59.000000')
            }
        });
      const expenses = this.expenseRepository.find(
          {
              where: {
                  company: company.id,
                  expenseDate: Between(n+'-04-01  00:00:00.000000', n+1+'-3-31  23:59:59.000000')
              }
          });
      const invoiceStates = this.invoiceRepository.find(
          {
              where: {
                  company: company.id,
                  dueDate: Between(n+'-04-01  00:00:00.000000', n+1+'-3-31  23:59:59.000000'),
              }
          });

      return this.generateJSONstring(this.processIncomes(await invoices), this.processExpenses(await expenses), this.invoiceState(await invoiceStates));
  }

    private invoiceState(
        invoices: Invoice[]
    ) :number[]{

      let paid: number = 0;
      let waitingForPayment: number = 0;
      let overdue: number = 0;
      let overduePayments: number = 0;
      let expectedPayments: number = 0;
      invoices.forEach(invoice => {
          if (invoice.paidDate != null){
              paid += 1;
          }
          else if (invoice.dueDate.getTime() <= new Date().getTime()){
              overdue += 1;
              overduePayments += this.sumTotal(invoice);
          }
          else {
              waitingForPayment += 1;
              expectedPayments += this.sumTotal(invoice);
          }
      })
        return [paid, waitingForPayment, overdue, expectedPayments, overduePayments];
  }

  private generateJSONstring (
      incomes: Map<string, number>,
      expenses: Map<string, number>,
      invoiceStates :number[]
  ) :string {
      let data = '{ "income" : {' ;
      incomes.forEach((value, key, map) => {
          data+=' "'+key+'":"'+value+'" ,';
      })
      data = data.slice(0, data.lastIndexOf(",")) + data.slice(data.lastIndexOf(",")+1) + '}';
      data+= ', "expense" : {' ;
      expenses.forEach((value, key, map) => {
          data+=' "'+key+'":"'+value+'" ,';
      })
      data = data.slice(0, data.lastIndexOf(",")) + data.slice(data.lastIndexOf(",")+1) + '}';
      data+= ', "invoiceState" : { "paid":"'+invoiceStates[0]+'" , "waitingForPayment":"'+invoiceStates[1]+'" , "overdue":"'+invoiceStates[2]+'"';
      data+= ', "expectedPayments":"'+invoiceStates[3]+'" , "overduePayments":"'+invoiceStates[4]+'"}}';
      return data
  }

  private processExpenses (
      expenses: Expense[]
  ): Map<string, number>{
      let data = new Map([ ['jan',0], ['feb',0], ['mar',0], ['apr',0], ['may',0], ['jun',0], ['jul',0], ['aug',0], ['sep',0], ['oct',0], ['nov',0], ['dec',0]]);
      expenses.forEach(expense =>{
          switch(expense.expenseDate.slice(5,7)) {
              case "01":
                  data.set('jan', data.get('jan') + parseFloat(''+expense.expenseAmount));
                  break;
              case "02":
                  data.set('feb', data.get('feb') + parseFloat(''+expense.expenseAmount));
                  break;
              case "03":
                  data.set('mar', data.get('mar') + parseFloat(''+expense.expenseAmount));
                  break;
              case "04":
                  data.set('apr', data.get('apr') + parseFloat(''+expense.expenseAmount));
                  break;
              case "05":
                  data.set('may', data.get('may') + parseFloat(''+expense.expenseAmount) );
                  break;
              case "06":
                  data.set('jun', data.get('jun') + parseFloat(''+expense.expenseAmount));
                  break;
              case "07":
                  data.set('jul', data.get('jul') + parseFloat(''+expense.expenseAmount));
                  break;
              case "08":
                  data.set('aug', data.get('aug') + parseFloat(''+expense.expenseAmount));
                  break;
              case "09":
                  data.set('sep', data.get('sep') + parseFloat(''+expense.expenseAmount));
                  break;
              case "10":
                  data.set('oct', data.get('oct') + parseFloat(''+expense.expenseAmount));
                  break;
              case "11":
                  data.set('nov', data.get('nov') + parseFloat(''+expense.expenseAmount));
                  break;
              case "12":
                  data.set('dec', data.get('dec') + parseFloat(''+expense.expenseAmount));
                  break;
          }
      })
      return data;
  }

  private processIncomes(
      invoices :Invoice[]
  ):Map<string, number>{
      let data = new Map([ ['jan',0], ['feb',0], ['mar',0], ['apr',0], ['may',0], ['jun',0], ['jul',0], ['aug',0], ['sep',0], ['oct',0], ['nov',0], ['dec',0] ]);
      invoices.forEach(invoice =>{
          switch(invoice.paidDate.slice(5,7)) {
              case "01":
                  data.set('jan', data.get('jan') + this.sumTotal(invoice));
                  break;
              case "02":
                  data.set('feb', data.get('feb') + this.sumTotal(invoice));
                  break;
              case "03":
                  data.set('mar', data.get('mar') + this.sumTotal(invoice));
                  break;
              case "04":
                  data.set('apr', data.get('apr') + this.sumTotal(invoice));
                  break;
              case "05":
                  data.set('may', data.get('may') + this.sumTotal(invoice));
                  break;
              case "06":
                  data.set('jun', data.get('jun') + this.sumTotal(invoice));
                  break;
              case "07":
                  data.set('jul', data.get('jul') + this.sumTotal(invoice));
                  break;
              case "08":
                  data.set('aug', data.get('aug') + this.sumTotal(invoice));
                  break;
              case "09":
                  data.set('sep', data.get('sep') + this.sumTotal(invoice));
                  break;
              case "10":
                  data.set('oct', data.get('oct') + this.sumTotal(invoice));
                  break;
              case "11":
                  data.set('nov', data.get('nov') + this.sumTotal(invoice));
                  break;
              case "12":
                  data.set('dec', data.get('dec') + this.sumTotal(invoice));
                  break;
          }
      })
      return data;
  }

  private sumTotal(
      invoice :Invoice
  ) :number {
      let sum = 0;
      invoice.invoiceItemLists.forEach( item => {
          let price = item.item.itemPriceWithoutTax * item.quantity ;
          if (item.discount != 0){
              price *= 1 - item.discount/100;
          }
          sum += price;
      })
      return sum;
  }

}
