import { Router } from 'express';
import { Account } from '../database/models/account/Account';
import { Transaction } from '../database/models/transaction/Transaction';
import { TransactionTypes } from '../constants/TransactionTypes';

const accountRouter = Router();

accountRouter.get('/', async (_, res) => {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
});

accountRouter.get('/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    res.status(200).json(account);
});

accountRouter.get('/balance/:id', async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findByPk(accountId);
        if (!account)
            return res.status(404).send({
                message: 'Invalid Account'
            });
        const transactions = await Transaction.findAll({
            where: {
                accountId
            }
        });
        let totalDeposits = 0;
        let totalWithdrawals = 0;
        for (const transaction of transactions) {
            if (transaction.type === TransactionTypes.DEPOSIT)
                totalDeposits += transaction.amount;
            else totalWithdrawals += transaction.amount;
        }
        res.status(200).send({
            currentFunds: account.funds,
            totalWithdrawals,
            totalDeposits
        });
    } catch {
        res.send(500).send("Couldn't process request");
    }
});

export { accountRouter };
