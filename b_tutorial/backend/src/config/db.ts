import { Sequelize } from 'sequelize-typescript'

export const db = new Sequelize(process.env.DB_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  // define: {
  //     timestamps: false
  // }
  //! Para conexiones de servicios externos
  // dialectOptions: {
  //     ssl: {
  //         require: false
  //     }
  // }
})
