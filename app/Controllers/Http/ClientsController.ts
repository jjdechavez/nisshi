import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientStatus from 'App/Enums/ClientStatus'
import Client from 'App/Models/Client'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const clients = await Client.query().select(['id', 'name', 'status']).paginate(page, limit)

    return view.render('dashboard/clients/index', { clients })
  }

  public async create({ view }: HttpContextContract) {
    const clientStatus = ClientStatus
    return view.render('dashboard/clients/create_or_edit', { clientStatus })
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ClientValidator)
    const client = await Client.create(payload)

    session.flash('success', `${client.name} has been successfully created!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    await client.load('members', (memberQuery) => {
      memberQuery.preload('contacts', (contactQuery) => {
        contactQuery.preload('contactType')
      })
    })
    await client.load('projects', (projectQuery) => {
      projectQuery.preload('projectStatus')
    })

    return view.render('dashboard/clients/show', { client })
  }

  public async edit({ params, view }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    const clientStatus = ClientStatus
    return view.render('dashboard/clients/create_or_edit', { client, clientStatus })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)

    const payload = await request.validate(ClientValidator)

    await client.merge(payload).save()
    session.flash('success', `${client.name} changes were successfully saved!`)

    return response.redirect().toRoute('clients_show', { id: client.id })
  }
}
