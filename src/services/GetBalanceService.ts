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
    let income = 0;
    let outcome = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });
    const total: number = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }
}

export default GetBalanceService;
