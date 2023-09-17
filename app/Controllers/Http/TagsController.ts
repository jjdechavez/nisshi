import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TagsController {
  public async searchTag({ request, view }: HttpContextContract) {
    const term = request.qs().tag
    const tags = [
      { id: 1, name: 'Authentication' },
      { id: 2, name: 'Role' },
    ]

    let tagResult = tags
    if (term.length > 0) {
      tagResult = tags.filter((tag) => tag.name.toLowerCase().includes(term.toLowerCase()))
    }

    return view.render('dashboard/partials/projects/tag_option', { tags: tagResult, search: term })
  }

  public async selectTag({ request, view }: HttpContextContract) {
    const qs = request.qs()
    console.log(qs)
    const { name, type }  = qs
    return view.render('dashboard/partials/projects/tag_item', { name: name.toUpperCase(), type })
  }

  public async unselectTag({ response }: HttpContextContract) {
    return response.status(200)
  }
}
