import { UUID } from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User';

export class Accounts extends Model {
    id!: UUID;
    userId!: UUID;
    funds!: number;
}

export const syncAccounts = (db: Sequelize) => {
    Accounts.init(
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
            }
        },
        { modelName: 'Accounts', sequelize: db, timestamps: true }
    );
};
