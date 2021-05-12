import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {CompanyRepository} from "./company.repository";
import {CompanyController} from "./company.controller";
import {CompanyService} from "./company.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyRepository]),
        AuthModule,
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}