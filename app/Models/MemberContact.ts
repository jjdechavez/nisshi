import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import ContactType from './ContactType'

export default class MemberContact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public memberId: number

  @column()
  public contactTypeId: number

  @column()
  public value: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Member)
  public member: BelongsTo<typeof Member>

  @belongsTo(() => ContactType)
  public contactType: BelongsTo<typeof ContactType>
}
