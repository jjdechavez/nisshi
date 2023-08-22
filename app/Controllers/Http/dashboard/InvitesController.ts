import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Roles from 'App/Enums/Roles'
import InviteEmail from 'App/Mailers/InviteEmail'
import Invite from 'App/Models/Invite'
import Role from 'App/Models/Role'
import CreateInviteValidator from 'App/Validators/CreateInviteValidator'

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

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateInviteValidator)
    const invited = await Invite.create(payload)

    await new InviteEmail(invited).sendLater()

    session.flash('success', `Invitation has been sent to ${invited.email}`)
    return response.redirect().toRoute('systems_members')
  }

  public async confirm({ request, params, view }: HttpContextContract) {
    const isSignatureValid = request.hasValidSignature()
    const id = params.id

    return view.render('invite', { isSignatureValid, id })
  }
}
