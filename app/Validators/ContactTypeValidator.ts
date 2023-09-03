import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(100),
      rules.unique({ table: 'contact_types', column: 'name' })
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Enter contact type name',
    'name.minLength': 'Contact type name too short',
    'name.maxLength': 'Contact type name should not exceed 100 characters',
    'name.unique': 'Contact type with this name already exists',
  }
}
