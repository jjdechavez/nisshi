import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientStatus from 'App/Enums/ClientStatus'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(2), rules.maxLength(255)]),
    status: schema.enum(Object.values(ClientStatus)),
  })

  public messages: CustomMessages = {
    'name.required': 'Enter client name',
    'name.minLength': 'Client name too short',
    'name.maxLength': 'Client name is too long, reached 255 characters',
    'status.enum': 'Client status value must be one of {{ options.choices }}',
  }
}
