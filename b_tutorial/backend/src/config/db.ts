import { Sequelize } from "sequelize-typescript"

export const db = new Sequelize( process.env.DB_URL, {
    //! Para conexiones de servicios externos
    // dialectOptions: {
    //     ssl: {
    //         require: false
    //     }
    // }
})