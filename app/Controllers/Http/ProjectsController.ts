import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Project from 'App/Models/Project'
import ProjectValidator from 'App/Validators/ProjectValidator'

export default class ProjectsController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const projects = await Project.query().preload('projectStatus').paginate(page, limit)

    return view.render('dashboard/projects/index', { projects })
  }

  public async show({ params, view }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)
    await project.load('projectStatus')

    return view.render('dashboard/projects/show', { project })
  }

  public async createClientProject({ view }: HttpContextContract) {
    return view.render('dashboard/clients/projects/create_or_edit')
  }

  public async storeClientProject({ params, request, session, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id)

    const payload = await request.validate(ProjectValidator)
    const project = await Project.create({
      ...payload,
      clientId: client.id,
    })

    session.flash('success', `${project.name} has been successfully created!`)
    return response.redirect().toRoute('clients_show', { id: client.id })
  }

  public async editClientProject({ params, view }: HttpContextContract) {
    const project = await Project.query()
      .where('id', params.projectId)
      .andWhere('clientId', params.id)
      .firstOrFail()

    return view.render('dashboard/clients/projects/create_or_edit', { project })
  }

  public async updateClientProject(ctx: HttpContextContract) {
    const { params, request, session, response } = ctx
    const project = await Project.query()
      .where('id', params.projectId)
      .andWhere('clientId', params.id)
      .firstOrFail()

    const payload = await request.validate(new ProjectValidator(ctx, project))
    await project.merge(payload).save()

    session.flash('success', `${project.name} changes were successfully saved!`)

    return response.redirect().toRoute('clients_show', { id: project.clientId })
  }
}
