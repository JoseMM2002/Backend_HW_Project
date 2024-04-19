import type { UUID } from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { TransactionType } from '../../constants/TransactionTypes';
import { Accounts } from './Account';

export class Transaction extends Model {
    id!: UUID;
    amount!: number;
    type!: TransactionType;
    accountId!: UUID;
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
                    model: Accounts,
                    key: 'id'
                },
                allowNull: false
            }
        },
        { modelName: 'Transactions', sequelize: db, timestamps: true }
    );
};
