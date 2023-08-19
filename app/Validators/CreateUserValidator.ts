import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 255;

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
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

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'firstName.required': 'Enter your first name',
    'firstName.minLength': 'First name too short',
    'lastName.required': 'Enter your last name',
    'lastName.minLength': 'Last name too short',
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
    'password.required': 'Password field is required',
    'password.minLength':
      'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
    'password.oneLowerCaseAtLeast':
      'Password must contain at least one lowercase letter',
    'password.oneUpperCaseAtLeast':
      'Password must contain at least one uppercase letter',
    'password.oneNumericAtLeast': 'Password must contain at least one digit',
    'password.oneSpecialCharacterAtLeast':
      'Password must contain at least one special character',
    'password_confirmation.required': 'Password confirmation is required',
    'password_confirmation.confirmed':
      'Password and confirm password does not match.',
    'password_confirmation.minLength':
      'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
  }
}
