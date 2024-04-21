import { Router } from 'express';
import { cardRouter } from './card';
import { accountRouter } from './account';
import { transactionRouter } from './transaction';

const apiRouter = Router();

apiRouter.get('/', (_, res) => {
    res.status(200).send({
        message: 'Api working'
    });
});

apiRouter.use('/card', cardRouter);
apiRouter.use('/account', accountRouter);
apiRouter.use('/transaction', transactionRouter);

export { apiRouter };
