import {Body, Controller, Get, Post, Query, Render, UsePipes, ValidationPipe} from "@nestjs/common";
import {GetItemsFilterDto} from "./dto/get-items-filter.dto";
import {Item} from "./item.entity";
import {Company} from "../company/company.entity";
import {CreateItemDto} from "./dto/create-item.dto";
import {ItemService} from "./item.service";

@Controller('item')
export class ItemController{
    constructor(
        private itemService: ItemService,
    ) {}

    @Get()
    @Render('items/items.hbs')
    getItems(
        @Query(ValidationPipe) filterDto: GetItemsFilterDto,
    ): Promise<Item[]> {
        const company = new Company();
        company.id = 1;
        return this.itemService.getItems(company, filterDto);
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    CreateItem(
        @Body() createItemDto: CreateItemDto,
    ): Promise<Item> {
        const company = new Company();
        company.id = 1;
        return this.itemService.createItem(company, createItemDto);
    }
}