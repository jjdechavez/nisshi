import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    position: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'Enter member name',
    'name.minLength': 'Member name too short',
    'position.required': 'Enter member position',
    'position.minLength': 'Member position too short',
  }
}
