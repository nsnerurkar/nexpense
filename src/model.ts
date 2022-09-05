import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, createConnection, Connection, Repository} from "typeorm";

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

let connection:Connection;

export async function getExpenseRepository(): Promise<Repository<Expense>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      entities: [
        Expense
      ],
    });
  }
  return connection.getRepository(Expense);
}