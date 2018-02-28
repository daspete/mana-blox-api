'use strict'

class CheckPermission {
  async handle(request, response, next, permission) {
    const isLoggedIn = await request.auth.check()
    if (isLoggedIn) {
      const user = await request.auth.getUser()
      if (await user.can(permission)) {
        await next
      }
    }

    response.forbidden('You do not have permission to see that section')
  }
}

module.exports = CheckPermission
