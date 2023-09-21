/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/setup', 'SetupsController.create').as('setup')
Route.post('/setup', 'SetupsController.store').as('setup_store')
Route.get('/login', 'AuthController.login').as('login')
Route.post('/login', 'AuthController.loginStore').as('login_store')
Route.get('/logout', 'AuthController.logout').as('logout')

Route.get('/invites/:id/confirm', 'InvitesController.confirm').as('invites_confirm')
Route.post('/invites/:id/confirm', 'InvitesController.confirmStore').as('invites_confirm_store')

Route.group(() => {
  Route.get('/', 'DashboardController.index').as('dashboard')
  Route.get('/teams', 'DashboardController.teams').as('teams')

  Route.group(() => {
    Route.get('/', 'ClientsController.index').as('clients')
    Route.get('/create', 'ClientsController.create').as('clients_create')
    Route.post('/', 'ClientsController.store').as('clients_store')
    Route.get('/:id', 'ClientsController.show').as('clients_show')
    Route.get('/:id/edit', 'ClientsController.edit').as('clients_edit')
    Route.put('/:id', 'ClientsController.update').as('clients_update')

    Route.get('/:id/members/create', 'MembersController.create').as('clients_members_create')
    Route.post('/:id/members', 'MembersController.store').as('clients_members_store')
    Route.get('/:id/members/:memberId/edit', 'MembersController.edit').as('clients_members_edit')
    Route.put('/:id/members/:memberId', 'MembersController.update').as('clients_members_update')
    Route.delete('/:id/members/:memberId', 'MembersController.destroy').as('clients_members_destroy')

    Route.get('/:id/members/forms/contact', 'MembersController.contactField').as('clients_members_forms_contact')

    Route.get('/:id/projects/create', 'ProjectsController.createClientProject').as('clients_projects_create')
    Route.post('/:id/projects', 'ProjectsController.storeClientProject').as('clients_projects_store')
    Route.get('/:id/projects/:projectId/edit', 'ProjectsController.editClientProject').as('clients_projects_edit')
    Route.put('/:id/projects/:projectId', 'ProjectsController.updateClientProject').as('clients_projects_update')
  }).prefix('/clients')

  Route.group(() => {
    Route.get('/', 'ProjectsController.index').as('projects')
    Route.get('/:id', 'ProjectsController.show').as('projects_show')
    Route.get('/:id/edit', 'ProjectsController.edit').as('projects_edit')
    Route.put('/:id', 'ProjectsController.update').as('projects_update')
  }).prefix('/projects')

  Route.group(() => {
    Route.get('/search/items', 'TagsController.searchTag').as('tags_search_item')
    Route.get('/select/items', 'TagsController.selectTag').as('tags_select_item')
    Route.delete('/unselect/items', 'TagsController.unselectTag').as('tags_unselect_item')
  }).prefix('/tags')

  Route.group(() => {
    Route.get('/members', 'SystemsController.index').as('systems_members')

    Route.group(() => {
      Route.get('/', 'SystemsController.index').as('systems_invites')
      Route.get('/create', 'InvitesController.create').as('systems_invites_create')
      Route.post('/', 'InvitesController.store').as('systems_invites_store')
      Route.get('/:id/resend', 'InvitesController.resend').as('systems_invites_resend')
    }).prefix('/invites')

    Route.get('/roles', 'SystemsController.roles').as('systems_roles')

    Route.group(() => {
      Route.get('/', 'ContactTypesController.index').as('systems_contact_types')
      Route.get('/create', 'ContactTypesController.create').as('systems_contact_types_create')
      Route.post('/', 'ContactTypesController.store').as('systems_contact_types_store')
      Route.get('/:id/edit', 'ContactTypesController.edit').as('systems_contact_types_edit')
      Route.put('/:id', 'ContactTypesController.update').as('systems_contact_types_update')
    }).prefix('/contact-types')

    Route.group(() => {
      Route.get('/', 'ProjectStatusesController.index').as('systems_project_statuses')
      Route.get('/create', 'ProjectStatusesController.create').as('systems_project_statuses_create')
      Route.post('/', 'ProjectStatusesController.store').as('systems_project_statuses_store')
      Route.get('/:id/edit', 'ProjectStatusesController.edit').as('systems_project_statuses_edit')
      Route.put('/:id', 'ProjectStatusesController.update').as('systems_project_statuses_update')
    }).prefix('/project-statuses')
  }).prefix('systems')
})
  .prefix('dashboard')
  .middleware('auth')
