'use strict'

const Permission = use('App/Models/Acl/Permission')
const Validator = use('Validator')

class PermissionController {

    async index({ request, response }){
        const permissions = await Permission.query()
        await response.send({
            permissions: permissions
        })
    }

    async store({ request, response }){
        const permission = new Permission;
        permission.permission_title = request.input("permission_title");
        permission.permission_slug = request.input("permission_slug");
        permission.permission_description = request.input("permission_description");

        var permissionData = request.all();
        var messages = {
            'permission_title.unique': 'Permission already exist',
            'permission_slug.unique': 'Permission Slug already exist'
        }
        const validation = await Validator.validate(permissionData, Permission.rules, messages)
        if (validation.fails()) {
            response.json({ success: false, error_message: validation.messages()[0] })
        } else {
            await permission.save();
            var message = {
                title: 'Success',
                text: 'Permission created successfully',
                type: 'success'
            }
            response.json({ success: true, message: message, new_permission: permission })
        }
    }

    async destroy({ request, response }){
        const id = request.param('id')
        const permission = await Permission.find(id);
        if (permission) {
            try {
                await permission.delete()
                response.json({ success: true, message: 'Permission has been deleted' });
            } catch (e) {
                response.json({ success: false, message: 'Error, deleting the permission', error: e });
            }
        } else {
            response.json({ success: false, message: 'Unable to find permission to delete' });
        }

        response.send(request.params());
    }

}

module.exports = PermissionController
