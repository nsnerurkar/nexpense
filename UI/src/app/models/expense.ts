export enum ExpenseType {
  RENT = "rent",
  ELECTRICITY = "electricity",
  CELLPHONE = "cellphone",
  INTERNET = "internet",
  DTH = "dth",
  FOOD = "food",
  GROCERIES = "groceries",
  BABYNEEDS = "baby needs",
  MISCELLANEOUS = "miscellaneous"
};

export class Expense {  
  ExpenseID!: number;
  Date!: Date;
  Amount!: number;
  Type!: ExpenseType;
  Description!: string;
}