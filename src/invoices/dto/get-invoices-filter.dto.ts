import {IsNotEmpty, IsOptional} from "class-validator";

export class GetInvoicesFilterDto {

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    specificSymbol: string;
}
