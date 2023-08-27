import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientStatus from 'App/Enums/ClientStatus'
import Client from 'App/Models/Client'
import CreateClientValidator from 'App/Validators/CreateClientValidator'

export default class ClientsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const clients = await Client.query().paginate(page, limit)

    return view.render('dashboard/clients/index', { clients })
  }

  public async create({ view }: HttpContextContract) {
    const clientStatus = ClientStatus
    return view.render('dashboard/clients/createOrEdit', { clientStatus })
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator)
    const client = await Client.create(payload)

    session.flash('success', `${client.name} has been successfully created!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)
    return view.render('dashboard/clients/show', { client })
  }
}
