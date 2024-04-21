import { Router } from 'express';
import { Card } from '../database/models/card/Card';
import { compareSync } from 'bcrypt';
import { Account } from '../database/models/account/Account';
import { User } from '../database/models/user/User';
const cardRouter = Router();

cardRouter.get('/', async (_, res) => {
    const cards = await Card.findAll();
    res.json(cards.map(acc => acc.createVm()));
});

cardRouter.get('/:id', async (req, res) => {
    const card = await Card.findByPk(req.params.id);
    res.json(card?.createVm());
});

cardRouter.post('/auth', async (req, res) => {
    console.log(JSON.stringify(req.body));
    const query = {
        cardNumber: req.body.cardNumber
    };
    if (!query.cardNumber)
        return res.status(400).send({
            message: "Request doesn't have Card Number"
        });
    if (!req.body.pin)
        return res.status(400).send({
            message: "Request doesn't have Pin"
        });
    try {
        const card = await Card.findOne({ where: query });
        if (!card)
            return res.status(404).send({
                message: "Card info isn't correct"
            });
        if (!compareSync(req.body.pin, card.pin))
            return res.status(404).send({
                message: 'Invalid pin'
            });
        const account = await Account.findByPk(card.accountId);
        const user = await User.findByPk(account?.userId);
        res.status(200).send({
            account: account?.createVm(),
            user: user?.createVm(),
            card: card.createVm()
        });
    } catch (e: unknown) {
        res.status(500).send({
            message: 'There was an internal error'
        });
    }
});

export { cardRouter };
