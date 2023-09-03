import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import ContactType from 'App/Models/ContactType'
import Member from 'App/Models/Member'
import MemberContact from 'App/Models/MemberContact'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/clients/members/create_or_edit')
  }

  public async store({ request, params, session, response }: HttpContextContract) {
    const payload = await request.validate(MemberValidator)
    const client = await Client.findOrFail(params.id)

    const member = await Member.create({
      name: payload.name,
      position: payload.position,
      clientId: client.id,
    })
    const formContacts = this.parseFormContact(payload)
    await member.related('contacts').createMany(formContacts)

    session.flash('success', `Member ${member.name} has been added successfully!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }

  public async edit({ params, view }: HttpContextContract) {
    const member = await Member.findOrFail(params.memberId)
    await member.load('contacts')

    const contactTypes = await ContactType.query().select(['id', 'name'])

    return view.render('dashboard/clients/members/create_or_edit', { member, contactTypes })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const member = await Member.query()
      .where('client_id', params.id)
      .andWhere('id', params.memberId)
      .firstOrFail()

    const payload = await request.validate(MemberValidator)

    await member.merge({ name: payload.name, position: payload.position }).save()
    const formContacts = this.parseFormContact(payload)

    const memberContacts = await member
      .related('contacts')
      .updateOrCreateMany(formContacts, 'value')
    const memberContactIds = memberContacts.map((contact) => contact.id)

    await MemberContact.query().delete().whereNotIn('id', memberContactIds)

    session.flash('success', `${member.name} changes were successfully saved!`)
    return response.redirect().toRoute('clients_show', { id: member.clientId })
  }

  public async contactField({ view }: HttpContextContract) {
    const contactTypes = await ContactType.query().select(['id', 'name'])
    return view.render('dashboard/partials/clients/members/contact_field', { contactTypes })
  }

  public async destroy({ params, session, response }: HttpContextContract) {
    const member = await Member.query()
      .where('id', params.memberId)
      .andWhere('client_id', params.id)
      .firstOrFail()

    await member.delete()
    session.flash('success', `${member.name} was successfully removed!`)
    return response.status(303).redirect().toRoute('clients_show', { id: member.clientId })
  }

  private parseFormContact({
    contactTypeId,
    value,
  }: {
    name: string
    position: string
    contactTypeId: string[]
    value: string[]
  }) {
    const formContacts = contactTypeId.map((id, index) => ({
      contactTypeId: +id,
      value: value[index],
    }))

    return formContacts
  }
}
