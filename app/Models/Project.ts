import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import ProjectStatus from './ProjectStatus'
import Tag from './Tag'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public projectStatusId: number

  @column()
  public code: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => ProjectStatus)
  public projectStatus: BelongsTo<typeof ProjectStatus>

  @manyToMany(() => Tag, {
    pivotTable: 'project_tags',
    pivotTimestamps: true,
  })
  public tags: ManyToMany<typeof Tag>
}
