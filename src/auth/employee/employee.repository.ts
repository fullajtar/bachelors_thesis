import {EntityRepository, Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {GetEmployeeFilterDto} from "./dto/get-employee-filter.dto";
import {Company} from "../../company/company.entity";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee>{
  async createEmployee(
      company: Company,
      createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee>{
    const {
      name,
      degreeAfterName,
      degreeBeforeName,
      email,
      phoneNumber,
      surname,
    } = createEmployeeDto;
    const employee = new Employee();

    //properties
    employee.name = name;
    employee.degreeAfterName = degreeAfterName;
    employee.degreeBeforeName = degreeBeforeName;
    employee.email = email;
    employee.phoneNumber = phoneNumber;
    employee.surname = surname;

    //relations
    employee.company = company;

    await employee.save();
    return employee;
  }

  async getEmployees(
      company: Company,
      filterDto: GetEmployeeFilterDto,
  ): Promise<Employee[]>{
    const { name } = filterDto;
    const query = this.createQueryBuilder('employee');

    query.where('employee.companyId = :companyId', { companyId: company.id });
    if (name) {
      query.andWhere( '(employee.name LIKE :search ' +
                            'OR employee.surname LIKE :search)', { search: `%${name}%` });
    }
    return await query.getMany();
  }
}