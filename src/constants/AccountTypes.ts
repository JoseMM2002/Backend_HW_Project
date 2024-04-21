export const AccountTypes = {
    START: 'STAR',
    PULSE: 'PULSE',
    MAESTRO: 'MAESTRO',
    MASTERCARD: 'MASTERCARD',
    PLUS: 'PLUS',
    VISA: 'VISA'
} as const;

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes];
