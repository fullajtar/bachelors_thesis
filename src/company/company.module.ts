import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {CompanyRepository} from "./company.repository";
import {CompanyController} from "./company.controller";
import {CompanyService} from "./company.service";
import {UserRepository} from "../auth/user.repository";
import {AuthService} from "../auth/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyRepository, UserRepository]),
        AuthModule,
    ],
    controllers: [CompanyController],
    providers: [CompanyService, AuthService],
})
export class CompanyModule {}