import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export class CreateEmployeeDto{
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsOptional()
  phoneNumber: string; //TODO number type

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  degreeBeforeName: string;

  @IsOptional()
  degreeAfterName: string;
}