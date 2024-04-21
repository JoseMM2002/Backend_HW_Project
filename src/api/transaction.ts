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
        const account = await Account.findByPk(params.accountId);
        if (!account)
            return res.status(400).send({
                message: "Couldn't find the Account"
            });
        if (account.funds < params.amount)
            return res.status(400).send({
                message: 'Not enough funds in the Account'
            });
        const transaction = await Transaction.create(params);
        res.status(200).send({
            transaction: transaction.createVm(),
            account: (await Account.findByPk(account.id))?.createVm()
        });
    } catch {
        res.status(500).send({
            message: 'Error on create transaction'
        });
    }
});

export { transactionRouter };
