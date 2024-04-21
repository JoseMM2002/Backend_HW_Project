import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from '../user/User';
import type { AccountType } from '../../../constants/AccountTypes';
import { addAccountHooks } from './Hooks';

export interface AccountAttributes {
    id: string;
    userId: string;
    funds: number;
    accountNumber: string;
    type: AccountType;
}

export interface AccountCreationAttributes
    extends Omit<AccountAttributes, 'id' | 'accountNumber' | 'funds'> {}

export class Account extends Model<
    AccountAttributes,
    AccountCreationAttributes
> {
    public id!: string;
    public userId!: string;
    public funds!: number;
    public accountNumber!: string;
    public type!: AccountType;
    public createVm() {
        return {
            id: this.id,
            funds: this.funds,
            userId: this.userId,
            accountNumber: this.accountNumber,
            type: this.type
        };
    }
}

export const syncAccounts = (db: Sequelize) => {
    Account.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: User,
                    key: 'id'
                },
                allowNull: false
            },
            funds: {
                type: DataTypes.DECIMAL(12, 4),
                defaultValue: 0
            },
            accountNumber: {
                type: DataTypes.STRING(12),
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { modelName: 'Accounts', sequelize: db, timestamps: true }
    );
    addAccountHooks();
};
