import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {ItemController} from "./item.controller";
import {ItemService} from "./item.service";
import {ItemRepository} from "./item.repository";
import {CompanyRepository} from "../company/company.repository";
import {CompanyService} from "../company/company.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemRepository, CompanyRepository]),
        AuthModule,
    ],
    controllers: [ItemController],
    providers: [ItemService, CompanyService],
})
export class ItemModule {}