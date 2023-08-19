import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class SystemsController {
  public async setup({ response, view }: HttpContextContract) {
    const hasRootUser = await User.first()
    if (hasRootUser) {
      response.header('content-type', 'text/html')
      response.status(404)
      return view.render('errors/not-found')
    }
    return view.render('auth/setup', { redirectTo: '/login' })
  }

  public async setupStore({ response, request, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)
    await User.create({
      ...payload,
      roleId: Roles.ROOT,
    })

    session.flash('success', 'Setup has been successfully!')

    return response.redirect().toRoute('login')
  }
}
