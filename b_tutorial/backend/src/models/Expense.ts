import {
  Table,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  Model,
  AllowNull,
} from 'sequelize-typescript'
import Budget from './Budget'

@Table({
  tableName: 'expenses',
})
class Expense extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number

  //Propiedades de la tabla
  @ForeignKey(() => Budget)
  declare budgetId: number

  @BelongsTo(() => Budget)
  declare budget: Budget
}

export default Expense
