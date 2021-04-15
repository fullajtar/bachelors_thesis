import {IsNotEmpty, IsOptional, Max, Min} from "class-validator";

export class CreateInvoiceItemListDto {
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  discount: number;
}