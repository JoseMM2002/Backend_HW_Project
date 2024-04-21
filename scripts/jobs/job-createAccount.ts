import { AccountTypes } from '../../src/constants/AccountTypes';
import { syncDb } from '../../src/database/connection';
import { Account } from '../../src/database/models/account/Account';
import { User } from '../../src/database/models/user/User';
import { numberValidator, run } from '../utils';

run(async rl => {
    await syncDb();

    const userEmail = await rl.asyncQuestion("Enter User's email: ", input => {
        return input.trim();
    });

    console.log('Finding user in db...');
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });

    if (!user) throw Error('User not found');

    const accountValues = Object.values(AccountTypes);
    accountValues.forEach((val, index) => {
        console.log(`${index}: ${val}`);
    });

    const idxType = parseInt(
        await rl.asyncQuestion('Chose Account Type: ', input => {
            numberValidator(input);
            return input;
        })
    );

    if (idxType >= accountValues.length)
        throw Error("Account Type isn't valid");

    await Account.create({
        userId: user.id,
        type: accountValues[idxType]
    });
});
