import { NextFunction, Request, Response, Router } from 'express';
import { getExpenseRepository, Expense } from './model';

export const router: Router = Router();

router.get('/expense', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getExpenseRepository();
    const allItems = await repository.find();
    res.send(allItems);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/expense/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getExpenseRepository();
    const item = await repository.findOne(req.params.id);
    res.send(item);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/expense', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getExpenseRepository();
    const expense = new Expense();
    expense.Date = req.body.Date;
    expense.Amount = Number.parseFloat(req.body.Amount);
    expense.Description = req.body.Description;
    expense.Type = req.body.Type;    

    const result = await repository.save(expense);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/expense/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getExpenseRepository();
    const expense = await repository.findOne(req.params.id);
    expense.Date = req.body.Date;
    expense.Amount = Number.parseFloat(req.body.Amount);
    expense.Description = req.body.Description;
    expense.Type = req.body.Type;

    const result = await repository.save(expense);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/expense/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getExpenseRepository();
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});