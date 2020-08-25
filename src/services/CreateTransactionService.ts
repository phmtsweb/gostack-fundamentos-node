import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import GetBalanceService from './GetBalanceService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const getBalanceService = new GetBalanceService(
      this.transactionsRepository,
    );
    const { total } = getBalanceService.execute();
    if (type !== 'income' && type !== 'outcome') {
      throw Error('This type is not valid');
    } else if (typeof value !== 'number' || value <= 0) {
      throw Error('This value is not valid');
    } else if (type === 'outcome' && total < value) {
      throw Error('This value does not debited');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
