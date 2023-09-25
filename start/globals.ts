/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'
import Role from 'App/Models/Role'
import Roles from 'App/Enums/Roles'
import { DateTime } from 'luxon'
import ClientStatus from 'App/Enums/ClientStatus'
import ProjectStatus from 'App/Models/ProjectStatus'

View.global('activeClientLinks', [
  'clients',
  'clients_create',
  'clients_show',
  'clients_edit',
  'clients_members_create',
  'clients_members_edit',
  'clients_projects_create',
  'clients_projects_edit',
])
View.global('activeProjectLinks', ['projects', 'projects_show', 'projects_edit'])
View.global('activeSystemLinks', [
  'systems_members',
  'systems_invites',
  'systems_invites_create',
  'systems_roles',
  'systems_contact_types',
  'systems_contact_types_create',
  'systems_roles_create',
  'systems_roles_edit',
  'systems_project_statuses',
  'systems_project_statuses_create',
  'systems_project_statuses_edit',
])

View.global('Roles', Roles)
View.global('loadRoles', function () {
  return Role.query().whereNot('id', Roles.ROOT).select('id', 'name')
})
View.global('printRole', function (roleId: number) {
  if (roleId === Roles.ROOT) {
    return 'Root'
  } else if (roleId === Roles.ADMIN) {
    return 'Admin'
  } else {
    return 'Unknown Alien'
  }
})

View.global('memberTabs', [
  { name: 'Members', href: '/dashboard/systems/members', active: 'systems_members' },
  {
    name: 'Invites and requests',
    href: 'systems_invites',
    active: ['systems_invites', 'systems_invites_create'],
  },
])

View.global('printDateFromString', function (date: string) {
  return DateTime.fromSQL(date).toFormat('LLL dd yyyy')
})

View.global('ClientStatus', ClientStatus)
View.global('loadProjectStatuses', function () {
  return ProjectStatus.query().select('id', 'name')
})

View.global('toOptions', function <
  T,
>(list: Array<T>, { label, value }: { label: string; value: string }) {
  return list.map((item) => ({
    label: item[label],
    value: item[value],
  }))
})
