'use strict'

const Role = use('App/Models/Acl/Role')
const Validator = use('Validator')

class RoleController {

    async index({ request, response }) {
        const roles = await Role.query()
        await response.send({
            roles: roles,
        })
    }

    async store({ request, response }) {
        const role = new Role;
        role.role_title = request.input("role_title");
        role.role_slug = request.input("role_slug");

        var roleData = request.all();
        var messages = {
            'role_title.unique': 'Role already exist',
            'role_slug.unique': 'Role Slug already exist'
        }
        const validation = await Validator.validate(roleData, Role.rules, messages)
        if (validation.fails()) {
            response.json({ success: false, error_message: validation.messages()[0] })
        } else {
            await role.save();
            var message = {
                title: 'Success',
                text: 'Role created successfully',
                type: 'success'
            }
            response.json({ success: true, message: message, new_role: role })
        }
    }

    async destroy({ request, response }) {
        const id = request.param('id')
        const role = await Role.find(id);
        if (role) {
            try {
                await role.delete()
                response.json({ success: true, message: 'Role has been deleted' });
            } catch (e) {
                response.json({ success: false, message: 'Error, deleting the role', error: e });
            }
        } else {
            response.json({ success: false, message: 'Unable to find role to delete' });
        }

        response.send(request.params());
    }


}

module.exports = RoleController
