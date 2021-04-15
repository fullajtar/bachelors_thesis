import {IsNotEmpty, IsOptional} from "class-validator";

export class GetEmployeeFilterDto{
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    surname: string;
}