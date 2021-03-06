import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {join} from "path";
import {IsNumber} from "class-validator";
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //In our example we'll be using one script to keep this simple. Let's import the required libraries in our app.js file:
  const express = require('express');
  const exphbs = require('express-handlebars');

  app.useStaticAssets(join(__dirname, '..', 'public')); //https://docs.nestjs.com/techniques/mvc

  //method override
  let methodOverride = require('method-override');

  let helpers = require('handlebars-helpers')();

  //Now, we can configure express-handlebars as our view engine:
  app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layout: 'other',
    extname: '.hbs',
    //As you can see on the page, we have a single comment which consumes two lines. Let's create a custom helper to summarize that text.
    //
    // To do that, in the Handlebars configuration, we can define our helper functions. In our case, we'll clip comments to 64 characters:
    helpers:
        {


          priceWithoutTax(comment) {
            if (comment) {
              if (comment.invoiceItemLists) {
                let cost = 0;
                comment.invoiceItemLists.forEach(element => {
                  if (element.item && element.item.priceWithoutTax){
                    cost += (element.quantity * element.item.priceWithoutTax* (1 - element.discount/100));
                  }

                })
                return cost.toFixed(2);
              }
            }
          },
          priceWithTax(comment) {
            if (comment) {
              if (comment.invoiceItemLists) {
                let cost = 0;
                comment.invoiceItemLists.forEach(element => {
                  if (element.item && element.item.priceWithoutTax){
                    cost = cost + totalWithVat(element.item.tax, element.quantity, element.item.priceWithoutTax, element.discount)
                  }

                })
                return cost.toFixed(2);
              }
            }
          },
          toPay(invoiceEntity){
            if (invoiceEntity) {
              if (invoiceEntity.invoiceItemLists) {
                let cost = 0;
                invoiceEntity.invoiceItemLists.forEach(element => {
                  if (element.item && element.item.priceWithoutTax){
                    cost = cost + totalWithVat(element.item.tax, element.quantity, element.item.priceWithoutTax, element.discount);
                  }

                })
                if (invoiceEntity.deposit == undefined){
                  return cost.toFixed(2);
                }
                return (cost - invoiceEntity.deposit).toFixed(2);
              }
            }
          },

          avgTax(invoice){
            if (invoice.invoiceItemLists){
              let temporary = 0;
              let itemsCount = 0;
              invoice.invoiceItemLists.forEach(element => {
                if (element.item && element.item.tax){
                  temporary += (element.quantity * element.item.tax );
                  itemsCount += element.quantity;
                }
              })
              return (temporary/itemsCount).toFixed(2);
            }
          },

          dateParse(date){
            if (date){
              let regEx = /^\d{4}-\d{2}-\d{2}$/;
              if (date.toString().match(regEx)){ // is already in good format
                return date;
              }
              let day = date.getDate();
              if (day < 10){
                day = '0'+day;
              }
              let month = date.getMonth() + 1; //Months are zero based
              if (month < 10){
                month = '0' + month;
              }
              let year = date.getFullYear();
              return (year + "-" + month + "-" + day);
            }
          },

          plus(a, b) {
            if (!IsNumber(a)) {
              throw new TypeError('expected the first argument to be a number');
            }
            if (!IsNumber(b)) {
              throw new TypeError('expected the second argument to be a number');
            }
            return Number(a) + Number(b);
          },

          multiply(a, b, discount){
            if (!IsNumber(a)) {
              throw new TypeError('expected the first argument to be a number');
            }
            if (!IsNumber(b)) {
              throw new TypeError('expected the second argument to be a number');
            }
            if (!IsNumber(discount)){
              throw new TypeError('expected the second argument to be a number');
            }
            return (Number(a) * Number(b) * (1 - discount/100)).toFixed(2);
          },



          singleItemWithTax(vat, priceForUnit){
            const result = priceForUnit * (vat/100) + parseFloat(priceForUnit);
            return result.toFixed(2);
          },

          totalWithVat(vat, quantity, priceForUnit, discount){
            vat = vat/100;
            discount = discount/100;
            const result = (quantity * priceForUnit) * (1 + vat) * (1 - discount);
            return result.toFixed(2);
          },

          absTax(vat, quantity, priceForUnit){
            vat = vat/100
            const totalWithoutVat = quantity * priceForUnit;
            const total = totalWithoutVat * (1 + vat);
            const result = total - totalWithoutVat;
            return result.toFixed(2);
          },
          ifCond(v1, v2, options) {
            if(v1 === v2) {
              return options.fn(this);
            }
            return options.inverse(this);
          },
          beforeDueDate(dueDate :Date, options){
            if (dueDate==null || dueDate.getTime() >= new Date().getTime()){
              return options.fn(this);
            }
            return options.inverse(this);
          },

        }
  }));

  app.set('view engine', 'hbs');

  //To extract it, you will need to use the express.urlencoded() middleware:
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(methodOverride('X-HTTP-Method-Override'));

  //apply the express-session middleware as global middleware
  app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      })
  )

  await app.listen(3000);
  console.log(`Application is running on port: ${await app.getUrl()}`);
}
bootstrap();

function totalWithVat(vat, quantity, priceForUnit, discount) :number{
  vat = vat/100;
  discount = discount/100;
  const result = (quantity * priceForUnit) * (1 + vat) * (1 - discount);
  return result;
}
