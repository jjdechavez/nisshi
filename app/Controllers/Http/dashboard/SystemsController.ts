import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SystemsController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const members = await Database.from('users').paginate(page, limit)

    members.baseUrl('/dashboard/systems/members')
    console.log(members)

    return view.render('dashboard/systems/index', { members })
  }

  public async roles({ view }: HttpContextContract) {
    return view.render('dashboard/systems/roles')
  }
}
