import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

function notFoundPage({
  response,
  view,
}: {
  response: HttpContextContract['response']
  view: HttpContextContract['view']
}) {
  response.header('content-type', 'text/html')
  response.status(404)

  return view.render('errors/not-found')
}

export default notFoundPage
