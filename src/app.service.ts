import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InvoiceRepository} from "./invoice/invoice.repository";
import {Company} from "./company/company.entity";
import {Invoice} from "./invoice/invoice.entity";
import {Between} from "typeorm";
import {ExpenseRepository} from "./expense/expense.repository";
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
                  date: Between(n+'-04-01  00:00:00.000000', n+1+'-3-31  23:59:59.000000')
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
      data+= this.mapStringifyJSON(incomes);
      data+= ', "expense" : {' ;
      data+= this.mapStringifyJSON(expenses);
      data+= ', "invoiceState" : { "paid":"'+invoiceStates[0]+'" , "waitingForPayment":"'+invoiceStates[1]+'" , "overdue":"'+invoiceStates[2]+'"';
      data+= ', "expectedPayments":"'+invoiceStates[3]+'" , "overduePayments":"'+invoiceStates[4]+'"}}';
      return data
  }

  private mapStringifyJSON(
      map: Map<string, number>
  ) :string {
      let outcome: string = "";
      map.forEach((value, key, map) => {
          outcome+=' "'+key+'":"'+value+'" ,';
      })
      return outcome.slice(0, outcome.lastIndexOf(",")) + outcome.slice(outcome.lastIndexOf(",")+1) + '}';
  }


  private processExpenses (
      expenses: Expense[]
  ): Map<string, number>{
      let data = new Map([ ['jan',0], ['feb',0], ['mar',0], ['apr',0], ['may',0], ['jun',0], ['jul',0], ['aug',0], ['sep',0], ['oct',0], ['nov',0], ['dec',0]]);
      expenses.forEach(expense =>{
          switch(expense.date.slice(5,7)) {
              case "01":
                  data.set('jan', data.get('jan') + parseFloat(''+expense.amount));
                  break;
              case "02":
                  data.set('feb', data.get('feb') + parseFloat(''+expense.amount));
                  break;
              case "03":
                  data.set('mar', data.get('mar') + parseFloat(''+expense.amount));
                  break;
              case "04":
                  data.set('apr', data.get('apr') + parseFloat(''+expense.amount));
                  break;
              case "05":
                  data.set('may', data.get('may') + parseFloat(''+expense.amount) );
                  break;
              case "06":
                  data.set('jun', data.get('jun') + parseFloat(''+expense.amount));
                  break;
              case "07":
                  data.set('jul', data.get('jul') + parseFloat(''+expense.amount));
                  break;
              case "08":
                  data.set('aug', data.get('aug') + parseFloat(''+expense.amount));
                  break;
              case "09":
                  data.set('sep', data.get('sep') + parseFloat(''+expense.amount));
                  break;
              case "10":
                  data.set('oct', data.get('oct') + parseFloat(''+expense.amount));
                  break;
              case "11":
                  data.set('nov', data.get('nov') + parseFloat(''+expense.amount));
                  break;
              case "12":
                  data.set('dec', data.get('dec') + parseFloat(''+expense.amount));
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
          let price = item.item.priceWithoutTax * item.quantity ;
          if (item.discount != 0){
              price *= 1 - item.discount/100;
          }
          sum += price;
      })
      return sum;
  }

}
