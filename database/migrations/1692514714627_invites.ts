import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import InviteStatus from 'App/Enums/InviteStatus'

export default class extends BaseSchema {
  protected tableName = 'invites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('role_id').unsigned().references('id').inTable('roles').notNullable()
      table.string('email', 255).notNullable().unique()
      table.enu('status', Object.values(InviteStatus)).notNullable().defaultTo(InviteStatus.PENDING)
      table.text('link').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
