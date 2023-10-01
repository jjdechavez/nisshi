import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class ProjectTagValidator {
  constructor(
    protected ctx: HttpContextContract,
    protected tag: Tag | void
  ) {}

  public schema = schema.create({
    name: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique(
        this.tag
          ? { table: 'tags', column: 'name', caseInsensitive: true, whereNot: { id: this.tag.id } }
          : { table: 'tags', column: 'name', caseInsensitive: true }
      ),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Enter project tag name',
    'name.minLength': 'Project tag name too short',
    'name.maxLength': 'Project tag name should not exceed 255 characters',
    'name.unique': 'Project tag with this name already exists',
  }
}
