import type { UUID } from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';
import type { CardType } from '../../constants/CardTypes';
import { Accounts } from './Account';
import { User } from './User';

export class Cards extends Model {
    id!: UUID;
    type!: CardType;
    pin!: string;
    accountId!: UUID;
    userId!: UUID;
}

export const syncCards = (db: Sequelize) => {
    Cards.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pin: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            accountId: {
                type: DataTypes.UUID,
                references: {
                    model: Accounts,
                    key: 'id'
                },
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: User,
                    key: 'id'
                },
                allowNull: false
            }
        },
        { modelName: 'Cards', sequelize: db, timestamps: true }
    );
};
