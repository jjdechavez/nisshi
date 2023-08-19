import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async loginStore({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.attempt(email, password)
      session.flash('success', `Welcome back, ${auth.user?.firstName}. You are now logged in.`)
      return response.redirect().toRoute('dashboard')
    } catch {
      session.flash({
        error: 'Invalid credentials',
        email,
      })
      return response.redirect().back()
    }
  }
}
