import {Module} from "@nestjs/common";
import {InvoicesModule} from "./invoices/invoices.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "src/config/typeorm.config";
import {AuthModule} from "./auth/auth.module";
import {OrderModule} from "./order/order.module";
import {ItemModule} from "./Items/item.module";
import {EmployeeModule} from "./employee/employee.module";
import {CompanyModule} from "./company/company.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InvoicesModule,
    AuthModule,
    OrderModule,
      ItemModule,
      EmployeeModule,
      CompanyModule,
  ],

  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
