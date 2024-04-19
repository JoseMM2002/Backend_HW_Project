import { Sequelize } from 'sequelize';
import { syncUsers } from './models/User';
import { syncAccounts } from './models/Account';
import { syncCards } from './models/Card';
import { syncTransactions } from './models/Transaction';

export const sequilize = async () => {
    const sequilize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite',
        logging: console.log
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
    await db.sync();
};
