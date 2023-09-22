import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Role.query().paginate(page, limit)

    roles.baseUrl('/dashboard/systems/roles')

    return view.render('dashboard/systems/roles/index', { roles })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/systems/roles/create_or_edit')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(RoleValidator)

    const role = await Role.create(payload)
    session.flash('success', `${role.name} has been successfully created!`)

    return response.redirect().toRoute('systems_roles')
  }

  public async edit({ params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return view.render('dashboard/systems/roles/create_or_edit', { role })
  }

  public async update(ctx: HttpContextContract) {
    const { params, request, session, response } = ctx
    const role = await Role.findOrFail(params.id)
    const payload = await request.validate(new RoleValidator(ctx, role))

    await role.merge(payload).save()
    session.flash('success', `${role.name} changes were successfully saved!`)

    return response.redirect().toRoute('systems_roles')
  }
}
