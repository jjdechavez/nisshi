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
  }).prefix('/clients')

  Route.group(() => {
    Route.get('/members', 'SystemsController.index').as('systems_members')

    Route.group(() => {
      Route.get('/', 'SystemsController.index').as('systems_invites')
      Route.get('/create', 'InvitesController.create').as('systems_invites_create')
      Route.post('/', 'InvitesController.store').as('systems_invites_store')
      Route.get('/:id/resend', 'InvitesController.resend').as('systems_invites_resend')
    }).prefix('/invites')

    Route.get('/roles', 'SystemsController.roles').as('systems_roles')
  }).prefix('systems')
})
  .prefix('dashboard')
  .middleware('auth')
