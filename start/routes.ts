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

Route.get('/setup', 'SystemsController.setup').as('setup')
Route.post('/setup', 'SystemsController.setupStore').as('setup_store')
Route.get('/login', 'AuthController.login').as('login')
Route.post('/login', 'AuthController.loginStore').as('login_store')
Route.get('/logout', 'AuthController.logout').as('logout')

Route.get('/invites/:id/confirm', 'dashboard/InvitesController.confirm').as('invites_confirm')
Route.post('/invites/:id/confirm', 'dashboard/InvitesController.confirmStore').as('invites_confirm_store')

Route.group(() => {
  Route.get('/', 'dashboard/DashboardController.index').as('dashboard')
  Route.get('/teams', 'dashboard/DashboardController.teams').as('teams')
  Route.get('/systems/members', 'dashboard/SystemsController.index').as('systems_members')
  Route.get('/systems/invites', 'dashboard/SystemsController.index').as('systems_invites')
  Route.get('/systems/invites/create', 'dashboard/InvitesController.create').as('systems_invites_create')
  Route.post('/systems/invites', 'dashboard/InvitesController.store').as('systems_invites_store')
  Route.get('/systems/roles', 'dashboard/SystemsController.roles').as('systems_roles')
}).prefix('dashboard')
