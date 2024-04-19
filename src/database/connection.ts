import { Sequelize } from "sequelize"
import { syncUsers } from "./models/User";

export const sequilize = async () => {
    const sequilize = new Sequelize({
        dialect: "sqlite",
        storage: './db.sqlite',
        logging: console.log
    })
    await sequilize.authenticate();
    return sequilize;
}

export const syncDb = async () => {
    const db = await sequilize();
    syncUsers(db);
    await db.sync();
}
