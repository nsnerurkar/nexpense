import { NextFunction, Request, Response, Router } from 'express';
import { DataSource } from 'typeorm';
import { Expense } from './model';

export const router: Router = Router();
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.db',
  synchronize: true,
  entities: [
    Expense
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });

router.get('/expense', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await AppDataSource.getRepository(Expense);
    const allItems = await repository.find();
    res.send(allItems);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/expense/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await AppDataSource.getRepository(Expense);
    const item = await repository.findOneBy({ExpenseID: req.params.id});
    res.send(item);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/expense', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await AppDataSource.getRepository(Expense);
    const action = req.body.action;    
    switch(action){
      case "insert":
        {
          const expense = new Expense();
          expense.Date = req.body.value.Date;
          expense.Amount = Number.parseFloat(req.body.value.Amount);
          expense.Description = req.body.value.Description;
          expense.Type = req.body.value.Type;
          const result = await repository.save(expense);          
          res.send(result);
          break;
        }
      case "update":
        {
          const expense = await repository.findOneBy({ ExpenseID: req.body.value.ExpenseID });
          expense.Date = req.body.value.Date;
          expense.Amount = Number.parseFloat(req.body.value.Amount);
          expense.Description = req.body.value.Description;
          expense.Type = req.body.value.Type;

          const result = await repository.save(expense);
          res.send(result);
          break;
        }
      case "remove":
        {          
          const repository = await AppDataSource.getRepository(Expense);
          await repository.delete(req.body.key);
          res.send(true);
          break;
        }
      default:
        console.error('Invalid Action');
    }    
  }
  catch (err) {
    return next(err);
  }
});