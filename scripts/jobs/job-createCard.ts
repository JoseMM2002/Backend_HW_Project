import { json } from 'sequelize';
import { syncDb } from '../../src/database/connection';
import { Account } from '../../src/database/models/account/Account';
import { Card } from '../../src/database/models/card/Card';
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
    const accounts = await Account.findAll({
        where: {
            userId: user.id
        }
    });

    if (!accounts.length)
        throw new Error(`Accounts not found for ${user.email}`);

    accounts.forEach((val, index) => {
        console.log(`${index}: ${val.id} ${val.type} ${val.funds}`);
    });

    const idxAccount = parseInt(
        await rl.asyncQuestion('Choose Account: ', input => {
            numberValidator(input);
            return input;
        })
    );

    if (idxAccount >= accounts.length) throw Error("Account Type isn't valid");

    const account = accounts[idxAccount];

    const pin = await rl.asyncQuestion(
        'Enter a pin with 4 size number: ',
        input => {
            numberValidator(input);
            if (input.length !== 4) throw new Error("Pin size isn't valid");
            return input;
        }
    );

    const card = await Card.create({
        accountId: account.id,
        pin
    });
    console.log(JSON.stringify(card));
});
