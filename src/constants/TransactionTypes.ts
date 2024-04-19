export const TransactionTypes = {
    WITHDRAWAL: 'WITHDRAWAL',
    DEPOSIT: 'DEPOSIT'
} as const;
export type TransactionType =
    (typeof TransactionTypes)[keyof typeof TransactionTypes];
