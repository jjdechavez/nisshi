import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SystemsController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const members = await Database.from('users').paginate(page, limit)

    members.baseUrl('/dashboard/systems/members')

    return view.render('dashboard/systems/index', {
      members,
      tabs: [
        { name: 'Members', active: 'systems_members' },
        { name: 'Invites and requests', active: 'systems_invites' },
      ],
    })
  }

  public async roles({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Database.from('roles').paginate(page, limit)

    roles.baseUrl('/dashboard/systems/roles')

    return view.render('dashboard/systems/roles', { roles })
  }
}
