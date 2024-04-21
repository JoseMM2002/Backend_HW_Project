import { TransactionTypes } from '../constants/TransactionTypes';
import type { Account } from '../database/models/account/Account';
import { Transaction } from '../database/models/transaction/Transaction';

export const calculateFunds = (account: Account, transaction: Transaction) => {
    switch (transaction.type) {
        case TransactionTypes.WITHDRAWAL:
            return account.funds - transaction.amount;
        case TransactionTypes.DEPOSIT:
            return account.funds + transaction.amount;
    }
};
