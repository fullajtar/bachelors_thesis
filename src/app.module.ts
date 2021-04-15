import {Module} from "@nestjs/common";
import {InvoicesModule} from "./invoices/invoices.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "src/config/typeorm.config";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InvoicesModule,
    AuthModule,
  ],

  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
