import {Body, Controller, Get, Post, Render, Res, Session, UsePipes, ValidationPipe} from "@nestjs/common";
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
        @Res() res,
    ): Promise<Item[] | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.itemService.getItems(company);
        }
        return res.redirect('/auth');
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async CreateItem(
        @Session() session: Record<string, any>,
        @Res() res,
        @Body() createItemDto: CreateItemDto,
    ): Promise<Item | {url:string, status:number}> {
        if (session.userid){
            const company = await this.getUsersCompany(session.userid)
            return this.itemService.createItem(company, createItemDto);
        }
        return res.redirect('/auth');
    }

    private async getUsersCompany(
        userId: number
    ) :Promise <Company>{
        return  this.companyService.getMyCompany(userId);
    }
}