import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Project from 'App/Models/Project'
import ProjectStatus from 'App/Models/ProjectStatus'
import ProjectValidator from 'App/Validators/ProjectValidator'

export default class ProjectsController {
  public async create({ view }: HttpContextContract) {
    const rawProjectStatus = await ProjectStatus.query().select('id', 'name')
    const projectStatus = rawProjectStatus.map((status) => ({
      value: status.id,
      label: status.name,
    }))

    return view.render('dashboard/clients/projects/create_or_edit', { projectStatus })
  }

  public async store({ params, request, session, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)

    const payload = await request.validate(ProjectValidator)
    const project = await Project.create({
      ...payload,
      clientId: client.id,
    })

    session.flash('success', `${project.name} has been successfully created!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }
}
