import {IsNotEmpty, IsOptional, Min} from "class-validator";

export class CreateItemDto{
  @IsNotEmpty()
  itemName: string;
  
  @IsOptional()
  itemBarcode: string;

  @IsNotEmpty()
  @Min(0)
  itemPriceWithoutTax: number;
  
  @IsNotEmpty()
  itemUnit: string;

  @IsNotEmpty()
 @Min(0)
  itemTax: number;

  @IsOptional()
  itemBody: string;

  @IsOptional()
  itemNote: string;
  
  
}