export const CardTypes = {
    START: 'STAR',
    PULSE: 'PULSE',
    MAESTRO: 'MAESTRO',
    MASTERCARD: 'MASTERCARD',
    PLUS: 'PLUS',
    VISA: 'VISA'
} as const;

export type CardType = (typeof CardTypes)[keyof typeof CardTypes];
