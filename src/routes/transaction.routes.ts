import { Router } from 'express';
import GetTransactionsWithBalanceService from '../services/GetTransactionsWithBalanceService';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const getTransactionsWithBalanceService = new GetTransactionsWithBalanceService(
      transactionsRepository,
    );
    return response.json(getTransactionsWithBalanceService.execute());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
