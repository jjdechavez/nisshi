import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectStatus from 'App/Models/ProjectStatus'
import ProjectStatusValidator from 'App/Validators/ProjectStatusValidator'

export default class ProjectStatusesController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const projectStatus = await ProjectStatus.query().paginate(page, limit)

    return view.render('dashboard/systems/project_statuses/index', { projectStatus })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/systems/project_statuses/create_or_edit')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ProjectStatusValidator)
    const projectStatus = await ProjectStatus.create(payload)

    session.flash('success', `${projectStatus.name} has been successfully created!`)
    return response.redirect().toRoute('systems_project_statuses')
  }

  public async edit({ params, view }: HttpContextContract) {
    const projectStatus = await ProjectStatus.findOrFail(params.id)
    return view.render('dashboard/systems/project_statuses/create_or_edit', { projectStatus })
  }

  public async update({ params, request, session, response }: HttpContextContract) {
    const projectStatus = await ProjectStatus.findOrFail(params.id)
    const payload = await request.validate(ProjectStatusValidator)

    await projectStatus.merge(payload).save()
    session.flash('success', `${projectStatus.name} changes were successfully saved!`)

    return response.redirect().toRoute('systems_project_statuses')
  }
}
