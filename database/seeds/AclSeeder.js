'use strict'

/*
|--------------------------------------------------------------------------
| AclSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

const Role = use('App/Models/Acl/Role')
const Permission = use('App/Models/Acl/Permission')
const PermissionRole = use('App/Models/Acl/PermissionRole')
// const RoleUser = use('App/Models/RoleUser')


class AclSeeder {
    async run() {
        console.log('bla');
        //const users = await Factory.model('App/Models/User').create()
        const role = new Role()
        role.role_title = 'Administrator'
        role.role_slug = 'super_admin'
        await role.save() // SQL Insert

        const permission = await Permission.createMany([
            {
                permission_title: 'ACL',
                permission_slug: 'acl_view',
                permission_description: 'ACL View'
            },
            {
                permission_title: 'users view',
                permission_slug: 'users_view',
                permission_description: 'shows users'
            }
        ])

        const permission_role = await PermissionRole.createMany([
            {
                permission_id: 1,
                role_id: 1
            },
            {
                permission_id: 2,
                role_id: 1
            },
        ])
    }
}

module.exports = AclSeeder
