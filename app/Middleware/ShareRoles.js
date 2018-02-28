'use strict'

class ShareRoles {
  async handle(request, response, next) {
    const isLoggedIn = await request.auth.check()
    if (isLoggedIn) {
      const user = await request.auth.getUser()
      var user_roles = JSON.parse(JSON.stringify(await user.roles().fetch()))
      var my_roles = []
      for (var i in user_roles) {
        my_roles.push(user_roles[i].role_slug);
      }
      await request.with({ my_roles: my_roles }).flash()
    }
    await next
  }
}

module.exports = ShareRoles
