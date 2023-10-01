import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import ProjectTagValidator from 'App/Validators/ProjectTagValidator'

export default class TagsController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const tags = await Tag.query().paginate(page, limit)

    return view.render('dashboard/systems/project_tags/index', { tags })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('dashboard/systems/project_tags/create_or_edit')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ProjectTagValidator)
    const tag = await Tag.create(payload)

    session.flash('success', `${tag.name} has been successfully created!`)
    return response.redirect().toRoute('systems_project_tags')
  }

  public async edit({ params, view }: HttpContextContract) {
    const tag = await Tag.findOrFail(params.id)
    return view.render('dashboard/systems/project_tags/create_or_edit', { tag })
  }

  public async update(ctx: HttpContextContract) {
    const { params, request, session, response } = ctx
    const tag = await Tag.findOrFail(params.id)
    const payload = await request.validate(new ProjectTagValidator(ctx, tag))

    await tag.merge(payload).save()

    session.flash('success', `${tag.name} changes were successfully saved!`)
    return response.redirect().toRoute('systems_project_tags')
  }

  public async searchTag({ request, view }: HttpContextContract) {
    const qs = request.qs()
    const term = qs.tag

    let currentTagIds: string[] = []
    if (qs?.tags) {
      currentTagIds = [...currentTagIds, ...qs.tags]
    }

    const tags = await Tag.query()
      .if(term, (query) => {
        query.whereLike('name', `%${term}%`)
      })
      .if(currentTagIds.length > 0, (query) => {
        query.whereNotIn('id', currentTagIds)
      })

    const tagsWithCount = await Tag.query()
      .if(term, (query) => {
        query.where('name', term)
      })
      .count('* as result')

    const countTag: number = tagsWithCount[0].$extras.result
    let searchState = 'result'
    if (countTag > 0 && term.length && tags.length === 0) {
      searchState = 'exist'
    } else if (countTag === 0 && tags.length === 0) {
      searchState = 'not-found'
    }

    return view.render('dashboard/partials/projects/tag_option', {
      tags,
      search: term,
      searchState,
    })
  }

  public async selectTag({ request, view }: HttpContextContract) {
    const qs = request.qs()
    const { id, name, type } = qs as
      | { id: string; name: string; type: 'option' }
      | { id: undefined; name: string; type: 'new' }
    console.log({ id, name, type })

    const payload = {
      id,
      name,
    }

    if (type === 'new') {
      const tag = await Tag.create({ name })

      Object.assign(payload, { id: tag.id })
    }
    return view.render('dashboard/partials/projects/tag_item', payload)
  }

  public async unselectTag({ response }: HttpContextContract) {
    return response.status(200)
  }
}
