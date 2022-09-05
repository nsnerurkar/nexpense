export type ExpenseType = "rent" | "electricity" | "cellphone" | "internet" | "dth" | "food" | "groceries" | "baby needs" | "miscellaneous";

export class Expense {  
  ExpenseID!: number;
  Date!: string;
  Amount!: number;
  Type!: ExpenseType;
  Description!: string;
}