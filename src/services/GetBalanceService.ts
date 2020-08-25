import TransactionsRepository from '../repositories/TransactionsRepository';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const transactions = this.transactionsRepository.all();
    const entries = {
      income: 0,
      outcome: 0,
    };
    transactions.forEach(transaction => {
      if (transaction.type === 'income' || transaction.type === 'outcome') {
        entries[transaction.type] += transaction.value;
      }
    });
    const { income, outcome } = entries;
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }
}

export default GetBalanceService;
