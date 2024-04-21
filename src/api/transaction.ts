import { Router } from 'express';
import { Transaction } from '../database/models/transaction/Transaction';
import { Account } from '../database/models/account/Account';

const transactionRouter = Router();

transactionRouter.post('/', async (req, res) => {
    const params = req.body;
    if (!params.type)
        return res.status(400).send({
            message: 'Type is not defined'
        });
    if (!params.amount)
        return res.status(400).send({
            message: 'Amount is not defined'
        });
    if (!params.accountId)
        return res.status(400).send({
            message: 'Account is not defined'
        });
    try {
        const transaction = await Transaction.create(params);
        const account = await Account.findByPk(transaction.accountId);
        res.status(200).send({
            transaction,
            account
        });
    } catch {
        res.status(500).send({
            message: 'Error on create transaction'
        });
    }
});

export { transactionRouter };
