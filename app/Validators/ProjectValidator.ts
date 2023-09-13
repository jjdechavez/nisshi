import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    code: schema.string([
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(3),
      rules.unique({ table: 'projects', column: 'code' }),
      rules.alphaNum(),
    ]),
    name: schema.string([rules.trim(), rules.minLength(2), rules.maxLength(255)]),
    projectStatusId: schema.number([rules.exists({ table: 'project_statuses', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'code.required': 'Enter project code',
    'code.minLength': 'Project code too short',
    'code.maxLength': 'Project code should not exceed 3 characters',
    'code.unique': 'Project with this code already exists',
    'name.required': 'Enter project name',
    'name.minLength': 'Project name too short',
    'name.maxLength': 'Project name should not exceed 255 characters',
    'projectStatusId.exists': 'Project status is not valid',
  }
}
