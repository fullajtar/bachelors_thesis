import {Body, Controller, Get, Post, Query, Render, Session, UsePipes, ValidationPipe} from "@nestjs/common";
import {GetItemsFilterDto} from "./dto/get-items-filter.dto";
import {Item} from "./item.entity";
import {Company} from "../company/company.entity";
import {CreateItemDto} from "./dto/create-item.dto";
import {ItemService} from "./item.service";
import {CompanyService} from "../company/company.service";

@Controller('item')
export class ItemController{
    constructor(
        private itemService: ItemService,
        private companyService: CompanyService
    ) {}

    @Get()
    @Render('items/items.hbs')
    async getItems(
        @Session() session: Record<string, any>,
        @Query(ValidationPipe) filterDto: GetItemsFilterDto,
    ): Promise<Item[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.itemService.getItems(company, filterDto);
        }
        return { url: '/auth', status: 401};
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async CreateItem(
        @Session() session: Record<string, any>,
        @Body() createItemDto: CreateItemDto,
    ): Promise<Item | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.itemService.createItem(company, createItemDto);
        }
        return { url: '/auth', status: 401};
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }
}