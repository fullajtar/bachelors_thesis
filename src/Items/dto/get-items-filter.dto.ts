import {IsNotEmpty, IsOptional} from "class-validator";

export class GetItemsFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}