import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RoleValidator {
  constructor(
    protected ctx: HttpContextContract,
    protected role: Role | void
  ) {}

  public schema = schema.create({
    name: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique(
        this.role
          ? { table: 'roles', column: 'name', whereNot: { id: this.role.id } }
          : { table: 'roles', column: 'name' }
      ),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Enter role name',
    'name.minLength': 'Role name too short',
    'name.maxLength': 'Role name should not exceed 255 characters',
    'name.unique': 'Role with this name already exists',
  }
}
