import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeRepository} from "./employee.repository";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {Employee} from "./employee.entity";
import {GetEmployeeFilterDto} from "./dto/get-employee-filter.dto";
import {Company} from "../../company/company.entity";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}
  async createEmployee(
      company: Company,
      createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee>{
    return this.employeeRepository.createEmployee(company, createEmployeeDto);
  }

  async getEmployees(
      company: Company,
      filterDto: GetEmployeeFilterDto,
  ): Promise<Employee[]>{
    return this.employeeRepository.getEmployees(company, filterDto);
  }

  async getEmployeeById(
      company: Company,
      id: number,
  ): Promise<Employee> {
    const found = await this.employeeRepository.findOne({ where: {id: id, company : company.id } });

    if (!found) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    return found;
  }
}