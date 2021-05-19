import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from "bcrypt";
import {Company} from "../company/company.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @ManyToOne(
        (type) => Company,
        (company) => company.user,
        { eager: true}
    )
    company: Company;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
