import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {ItemController} from "./item.controller";
import {ItemService} from "./item.service";
import {ItemRepository} from "./item.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemRepository]),
        AuthModule,
    ],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}