import { Sequelize } from 'sequelize';
import { syncUsers } from './models/user/User';
import { syncAccounts } from './models/account/Account';
import { syncCards } from './models/card/Card';
import { syncTransactions } from './models/transaction/Transaction';

export const sequilize = async () => {
    console.log('Connecting to db...');
    const sequilize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite'
        // logging: console.log
    });
    await sequilize.authenticate();
    return sequilize;
};

export const syncDb = async () => {
    const db = await sequilize();
    syncUsers(db);
    syncAccounts(db);
    syncCards(db);
    syncTransactions(db);
    console.log('Syncing db...');
    await db.sync({});
};
