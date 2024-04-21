import { calculateFunds } from '../../../utils/calculateFunds';
import { Account } from '../account/Account';
import { Transaction } from './Transaction';

export const addTransactionHooks = () => {
    Transaction.afterCreate(async transaction => {
        const account = await Account.findByPk(transaction.accountId);
        if (!account) return;
        console.log('Calculating new funds..');
        await account.update({
            funds: calculateFunds(account, transaction)
        });
    });
};
