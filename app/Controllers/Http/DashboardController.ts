import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const clients = await Database.from('clients').count('* as total')
    const projects = await Database.from('projects').count('* as total')
    const members = await Database.from('users').count('* as total')

    const counts = {
      clients: clients[0].total,
      projects: projects[0].total,
      members: members[0].total,
    }

    return view.render('dashboard/index', { counts })
  }
}
