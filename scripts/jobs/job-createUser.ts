import bcrypt from 'bcrypt';
import { User } from '../../src/database/models/user/User';
import { emailValidator, run } from '../utils';
import { syncDb } from '../../src/database/connection';

run(async rl => {
    await syncDb();
    await User.create({
        name: await rl.asyncQuestion("Enter User's name: ", input => {
            const trimmed = input.trim();
            return trimmed;
        }),
        email: await rl.asyncQuestion("Enter User's email: ", input => {
            const trimmed = input.trim();
            emailValidator(input);
            return trimmed;
        }),
        password: await rl.asyncQuestion("Enter User's password: ", input => {
            if (input.length < 8) throw new Error("Password isn't valid");
            const trimmed = input.trim();
            const hashed = bcrypt.hashSync(trimmed, 10);
            return hashed;
        })
    });
});
