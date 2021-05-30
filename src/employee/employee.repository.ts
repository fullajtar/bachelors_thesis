import {EntityRepository, Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {Company} from "../company/company.entity";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee>{
  async createEmployee(
      company: Company,
      createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee>{
    const { employeeName,
      employeeDegreeAfter,
      employeeDegreeBefore,
      employeeEmail,
      employeePhone,
      employeeSurname,
    } = createEmployeeDto;
    const employee = new Employee();

    //properties
    employee.name = employeeName;
    employee.degreeAfter = employeeDegreeAfter;
    employee.degreeBefore = employeeDegreeBefore;
    employee.email = employeeEmail;
    employee.phone = employeePhone;
    employee.surname = employeeSurname;

    //relations
    employee.company = company;

    await employee.save();
    return employee;
  }

  async getEmployees(
      company: Company,
  ): Promise<Employee[]>{
    return await this.find(
        {
          where: {company: company.id}
        })
  }

  async findDuplicity(
      company: Company,
      createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee>{
    const {
      employeeName,
      employeeSurname,
      employeePhone,
      employeeEmail,
      employeeDegreeBefore,
      employeeDegreeAfter,
    } = createEmployeeDto;

    const query = this.createQueryBuilder('employee');
    query.where('employee.companyId = :companyId', { companyId: company.id });

    query.andWhere('employee.name = :name', {name: employeeName});
    query.andWhere('employee.surname = :surname', {surname: employeeSurname});
    query.andWhere('employee.phoneNumber = :phoneNumber', {phoneNumber: employeePhone});
    query.andWhere('employee.email = :email', {email: employeeEmail});
    query.andWhere('employee.degreeBeforeName = :degreeBeforeName', {degreeBeforeName: employeeDegreeBefore});
    query.andWhere('employee.degreeAfterName = :degreeAfterName', {degreeAfterName: employeeDegreeAfter});

    return await query.getOne();
  }
}