import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";

export class CreateEmployeeDto{

  @IsOptional()
  employeeDegreeBefore: string;

  @IsNotEmpty()
  employeeName: string;

  @IsNotEmpty()
  employeeSurname: string;

  @IsOptional()
  employeePhone: string;

  @IsOptional()
  @IsEmail()
  employeeEmail: string;

  @IsOptional()
  employeeDegreeAfter: string;
}