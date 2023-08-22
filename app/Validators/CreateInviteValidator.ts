import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

export default class CreateInviteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
    ]),
    roleId: schema.number([rules.notIn([Roles.ROOT])]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
    'roleId.required': 'Role field is required',
    'roleId.notIn': 'Selected role is invalid',
  }
}
