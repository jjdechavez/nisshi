import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectStatus from 'App/Models/ProjectStatus'

export default class ProjectStatusesController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const projectStatus = await ProjectStatus.query().paginate(page, limit)

    return view.render('dashboard/systems/project_statuses/index', { projectStatus })
  }
}
