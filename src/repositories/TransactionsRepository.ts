import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[] = [];

  constructor() {
    this.transactions = [];
  }

  public all(): { transactions: Transaction[]; balance: Balance } {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      transaction.type === 'income'
        ? (income += transaction.value)
        : (outcome += transaction.value);
    });

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ id, title, value, type }: Transaction): Transaction {
    const transation = { id, title, value, type };

    this.transactions.push(transation);

    return transation;
  }
}

export default TransactionsRepository;
