import { DataTypes, Model, Sequelize } from 'sequelize';
import { TransactionType } from '../../../constants/TransactionTypes';
import { Account } from '../account/Account';
import { addTransactionHooks } from './Hooks';

export interface TransactionAttributes {
    id: string;
    amount: number;
    type: TransactionType;
    accountId: string;
}

export interface CreateTransactionAttributes
    extends Omit<TransactionAttributes, 'id'> {}

export class Transaction extends Model<
    TransactionAttributes,
    CreateTransactionAttributes
> {
    public id!: string;
    public amount!: number;
    public type!: TransactionType;
    public accountId!: string;
    public createVm() {
        return {
            id: this.id,
            amount: this.amount,
            type: this.type,
            accountId: this.accountId
        };
    }
}

export const syncTransactions = (db: Sequelize) => {
    Transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            amount: {
                type: DataTypes.DECIMAL(12, 4),
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountId: {
                type: DataTypes.UUID,
                references: {
                    model: Account,
                    key: 'id'
                },
                allowNull: false
            }
        },
        { modelName: 'Transactions', sequelize: db, timestamps: true }
    );
    addTransactionHooks();
};
