import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
  public async searchTag({ request, view }: HttpContextContract) {
    const qs = request.qs()
    const term = qs.tag

    let currentTags: string[] = []
    if (qs?.tags) {
      const requestTags: string[] = qs.tags.map((tag: string) => {
        const [name] = tag.split('_')
        return name
      })

      currentTags = [...currentTags, ...requestTags]
    }
    const tags = await Tag.query()
      .if(term, (query) => {
        query.whereLike('name', `%${term}%`)
      })
      .if(currentTags.length > 0, (query) => {
        query.whereNotIn('name', currentTags)
      })

    const tagsWithCount = await Tag.query()
      .if(term, (query) => {
        query.where('name', term.toUpperCase())
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
    const { name, type } = qs
    return view.render('dashboard/partials/projects/tag_item', { name: name.toUpperCase(), type })
  }

  public async unselectTag({ response }: HttpContextContract) {
    return response.status(200)
  }
}
