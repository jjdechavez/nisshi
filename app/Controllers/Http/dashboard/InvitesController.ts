import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InviteEmail from 'App/Mailers/InviteEmail'
import Invite from 'App/Models/Invite'
import CreateInviteValidator from 'App/Validators/CreateInviteValidator'
import InviteStatus from 'App/Enums/InviteStatus'
import ConfirmUserValidator from 'App/Validators/ConfirmUserValidator'
import User from 'App/Models/User'

export default class InvitesController {
  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/systems/invites_create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateInviteValidator)
    const invited = await Invite.create(payload)

    await new InviteEmail(invited).sendLater()

    session.flash('success', `Invitation has been sent to ${invited.email}`)
    return response.redirect().toRoute('systems_invites')
  }

  public async confirm({ request, params, view }: HttpContextContract) {
    const isSignatureValid = request.hasValidSignature()
    const id = params.id

    const invited = await Invite.findOrFail(id)

    if (isSignatureValid) {
      invited.status = InviteStatus.ACCEPTED
    } else {
      invited.status = InviteStatus.EXPIRED
    }

    await invited.save()
    return view.render('invite', { isSignatureValid, id, email: invited.email })
  }

  public async confirmStore({ request, params, session, response }: HttpContextContract) {
    const invited = await Invite.findOrFail(params.id)

    const body = request.body()
    body['roleId'] = invited.roleId
    request.updateBody(body)

    const payload = await request.validate(ConfirmUserValidator)

    await User.create({ ...payload, email: invited.email })
    session.flash('success', 'Setting up your account has been successfully!')

    return response.redirect().toRoute('login')
  }
}
