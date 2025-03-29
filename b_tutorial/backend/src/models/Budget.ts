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
import Expense from './Expense'
import User from './User'

@Table({
  tableName: 'budgets',
})
class Budget extends Model {
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
  @HasMany(() => Expense, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  declare expenses: Expense[]

  @ForeignKey(() => User)
  declare userId: number
}

export default Budget
