import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectStatusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique({ table: 'project_statuses', column: 'name' })
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Enter project status name',
    'name.minLength': 'Project status name too short',
    'name.maxLength': 'Project status name should not exceed 255 characters',
    'name.unique': 'Project status with this name already exists',
  }
}
