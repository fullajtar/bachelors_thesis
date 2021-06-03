import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeRepository} from "./employee.repository";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {Employee} from "./employee.entity";
import {Company} from "../company/company.entity";

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
      company: Company
  ): Promise<Employee[]>{
    return this.employeeRepository.getEmployees(company);
  }

  async editEmployee(
      id: number,
      createEmployeeDto: CreateEmployeeDto,
  ):Promise<Employee>{
    const employee = await this.employeeRepository.findOne({ where: { id: id } } )
    const {
        employeeName,
        employeeSurname,
        employeeDegreeBefore,
        employeeDegreeAfter,
        employeePhone,
        employeeEmail,
    } = createEmployeeDto;
    employee.name = employeeName;
    employee.surname = employeeSurname;
    employee.degreeBefore = employeeDegreeBefore;
    employee.degreeAfter = employeeDegreeAfter;
    employee.phone = employeePhone;
    employee.email = employeeEmail;
    await employee.save();
    return employee;
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

  async deleteEmployee(
      company: Company,
      id: number
  ):Promise<void>{
    await this.employeeRepository.delete({id: id, company: company});
  }

  async findDuplicity(
      company: Company,
      createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee>{
    return this.employeeRepository.findDuplicity(company, createEmployeeDto);
  }
}