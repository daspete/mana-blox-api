'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
    return { greeting: 'Hello world in JSON' }
})

Route.group(() => {

    Route.post('auth/login', 'AuthController.login')

    Route.resource('users', 'UsersController').middleware(new Map([
        [['store'], ['auth', 'acl:users_create']],
        [['update', 'delete'], ['auth', 'acl:users_edit']],
        [['destroy'], ['auth', 'acl:users_delete']]
    ]))

    Route.resource('permissions', 'PermissionController').middleware('acl:acl_view')
    Route.resource('roles', 'RoleController').middleware('acl:acl_view')
    Route.resource('permissions-roles', 'PermissionsRoleController').middleware('acl:acl_view')
    Route.resource('users-roles', 'RolesUserController').middleware('acl:acl_view')


}).prefix('api/v1')

Route.any('*', 'NuxtController.render')
