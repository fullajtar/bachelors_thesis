import {IsNotEmpty, IsOptional} from "class-validator";

export class GetCustomersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}