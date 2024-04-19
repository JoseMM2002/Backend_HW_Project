import { DataTypes, Model, Sequelize } from 'sequelize';
import type { UUID } from 'crypto';

export class User extends Model {
    public id!: UUID;
    public name!: string;
    public email!: string;
    public password!: string;
}

export const syncUsers = (db: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(60),
                allowNull: false
            }
        },
        {
            tableName: 'Users',
            sequelize: db
        }
    );
};
