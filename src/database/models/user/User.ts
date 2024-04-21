import { DataTypes, Model, Sequelize } from 'sequelize';
import { addUserHooks } from './Hooks';

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public createVm() {
        return {
            id: this.id,
            email: this.email,
            name: this.name
        };
    }
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
                allowNull: false,
                unique: true
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
    addUserHooks();
};
