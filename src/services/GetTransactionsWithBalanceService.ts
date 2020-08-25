import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import GetBalanceService, { Balance } from './GetBalanceService';

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsWithBalanceService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): TransactionsWithBalance {
    const transactions = this.transactionRepository.all();
    const getBalanceService = new GetBalanceService(this.transactionRepository);
    const balance = getBalanceService.execute();
    return { transactions, balance };
  }
}

export default GetTransactionsWithBalanceService;
