import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'expense'})
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  ExpenseID!: number

  @Column()
  Date!: string

  @Column()
  Amount!: number

  @Column()
  Type!: string;

  @Column()
  Description!: string
}
