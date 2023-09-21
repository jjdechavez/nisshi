import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Role.query().paginate(page, limit)

    roles.baseUrl('/dashboard/systems/roles')

    return view.render('dashboard/systems/roles/index', { roles })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('')
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
