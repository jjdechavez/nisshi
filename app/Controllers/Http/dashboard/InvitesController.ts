import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'
import Role from 'App/Models/Role'

export default class InvitesController {
  public async create({ view }: HttpContextContract) {
    const roles = await Role.query().whereNot('id', Roles.ROOT).select('id', 'name')
    const roleOptions = roles.map((role) => ({
      label: role.name,
      value: role.id,
    }))

    const payload = {
      tabs: [
        { name: 'Members', href: '/dashboard/systems/members', active: 'systems_members' },
        {
          name: 'Invites and requests',
          href: '/dashboard/systems/members',
          active: ['systems_invites', 'systems_invites_create'],
        },
      ],
      roleOptions,
    }
    return view.render('dashboard/systems/invites_create', payload)
  }

  public async store({}: HttpContextContract) {}
}
