import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Member from 'App/Models/Member'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/clients/members/createOrEdit')
  }

  public async store({ request, params, session, response }: HttpContextContract) {
    const payload = await request.validate(MemberValidator)
    const client = await Client.findOrFail(params.id)

    const member = await Member.create({
      ...payload,
      clientId: client.id,
    })

    session.flash('success', `Member ${member.name} has been added successfully!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }
}
