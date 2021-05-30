import {IsNotEmpty, IsOptional, Max, Min} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  discount: number;
}