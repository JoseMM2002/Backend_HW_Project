import { generateNumbers } from '../../../utils/generateNumbers';
import { Account } from './Account';

export const addAccountHooks = () => {
    Account.beforeValidate(async acc => {
        let unique = false;
        let accNum = '';
        while (!unique) {
            accNum = generateNumbers(12);
            console.log(`Acc Number: ${accNum}`);
            const count = await Account.count({
                where: {
                    accountNumber: accNum
                }
            });
            if (!count) unique = true;
        }
        acc.accountNumber = accNum;
    });
};
