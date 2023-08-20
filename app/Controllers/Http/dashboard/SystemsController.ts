import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SystemsController {
  public async index({ view }: HttpContextContract) {
    return view.render('dashboard/systems')
  }
}
