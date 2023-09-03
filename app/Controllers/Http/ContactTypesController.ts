import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactType from 'App/Models/ContactType'
import ContactTypeValidator from 'App/Validators/ContactTypeValidator'

export default class ContactTypesController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const contactTypes = await ContactType.query().paginate(page, limit)

    return view.render('dashboard/systems/contact_types/index', { contactTypes })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/systems/contact_types/create_or_edit')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ContactTypeValidator)
    const contactType = await ContactType.create(payload)

    session.flash('success', `${contactType.name} has been successfully created!`)
    return response.redirect().toRoute('systems_contact_types')
  }

  public async edit({ view, params }: HttpContextContract) {
    const contactType = await ContactType.findOrFail(params.id)
    return view.render('dashboard/systems/contact_types/create_or_edit', { contactType })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const contactType = await ContactType.findOrFail(params.id)
    const payload = await request.validate(ContactTypeValidator)

    await contactType.merge(payload).save()
    session.flash('success', `${contactType.name} changes were successfully saved!`)
    return response.redirect().toRoute('systems_contact_types')
  }
}
