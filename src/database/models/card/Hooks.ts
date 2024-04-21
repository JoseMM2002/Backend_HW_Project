import { Card } from './Card';
import { generateNumbers } from '../../../utils/generateNumbers';
import { hashSync } from 'bcrypt';

export const addCardHooks = () => {
    Card.beforeValidate(async card => {
        let cardNumber: string = '';
        let unique = false;
        while (!unique) {
            cardNumber = generateNumbers(16);
            const count = await Card.count({ where: { cardNumber } });
            if (!count) unique = true;
        }
        card.cardNumber = cardNumber;
    });

    Card.beforeValidate(card => {
        card.cvv = generateNumbers(3);
    });
    Card.beforeCreate(card => {
        card.pin = hashSync(card.pin, 10);
    });
};
