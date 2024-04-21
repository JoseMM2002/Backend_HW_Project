import { hashSync } from 'bcrypt';
import { User } from './User';

export const addUserHooks = () => {
    User.beforeCreate(user => {
        user.password = hashSync(user.password, 10);
    });
};
