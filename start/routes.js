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

    Route.resource('users', 'UsersController')//.middleware('acl:users_view')

})//.middleware('auth')
    //.middleware('roles')
    .prefix('api/v1')

Route.any('*', 'NuxtController.render')