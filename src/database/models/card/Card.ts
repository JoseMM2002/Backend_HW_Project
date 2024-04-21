import { DataTypes, Model, Sequelize } from 'sequelize';
import { addCardHooks } from './Hooks';
import { Account } from '../account/Account';

export interface CardAttributes {
    id: string;
    cardNumber: string;
    cvv: string;
    pin: string;
    accountId: string;
}

export interface CreationCardAttributes
    extends Omit<CardAttributes, 'id' | 'cardNumber' | 'cvv'> {}

export class Card extends Model<CardAttributes, CreationCardAttributes> {
    public id!: string;
    public cardNumber!: string;
    public cvv!: string;
    public pin!: string;
    public accountId!: string;
    public createVm() {
        return {
            id: this.id,
            cardNumber: this.cardNumber,
            accountId: this.accountId
        };
    }
}

export const syncCards = (db: Sequelize) => {
    Card.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cardNumber: {
                type: DataTypes.STRING(16),
                allowNull: false,
                unique: true
            },
            cvv: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            pin: {
                type: DataTypes.STRING(60),
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
        { modelName: 'Cards', sequelize: db, timestamps: true }
    );
    addCardHooks();
};
