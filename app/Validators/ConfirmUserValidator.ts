import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 255

export default class ConfirmUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roleId: schema.number([rules.notIn([Roles.ROOT])]),
    password: schema.string([
      rules.trim(),
      rules.minLength(PASSWORD_MIN_LENGTH),
      rules.maxLength(PASSWORD_MAX_LENGTH),
      rules.confirmed(),
    ]),
    firstName: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    lastName: schema.string([
      rules.escape(),
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
  })

  public messages: CustomMessages = {
    'roleId.required': 'Role field is required',
    'roleId.notIn': 'Selected role is invalid',
    'firstName.required': 'Enter your first name',
    'firstName.minLength': 'First name too short',
    'lastName.required': 'Enter your last name',
    'lastName.minLength': 'Last name too short',
    'password.required': 'Password field is required',
    'password.minLength': 'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
    'password.oneLowerCaseAtLeast': 'Password must contain at least one lowercase letter',
    'password.oneUpperCaseAtLeast': 'Password must contain at least one uppercase letter',
    'password.oneNumericAtLeast': 'Password must contain at least one digit',
    'password.oneSpecialCharacterAtLeast': 'Password must contain at least one special character',
    'password_confirmation.required': 'Password confirmation is required',
    'password_confirmation.confirmed': 'Password and confirm password does not match.',
    'password_confirmation.minLength':
      'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
  }
}
