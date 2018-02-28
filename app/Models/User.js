'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  static get hidden() {
    return ['password', 'password_temp', 'remember_token']
  }

  static get rules() {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users'
    }
  }

  static get dateFormat() {
    return 'DD.MM.YYYY HH:mm:ss'
  }

  getCreatedAt() {
    return moment(this.created_at).format('d F Y')
  }

  /*
|--------------------------------------------------------------------------
| ACL Methods
|--------------------------------------------------------------------------
*/

  /**
   * Checks a Permission
   *
   * @param  String permission Slug of a permission (i.e: manage_user)
   * @return Boolean true if has permission, otherwise false
   */
  can(permission) {
    return (permission != null) && this.checkPermission(permission)
  }

  /**
   * Check if the permission matches with any permission user has
   *
   * @param  String permission slug of a permission
   * @return Boolean true if permission exists, otherwise false
   */
  * checkPermission(perm) {
    return (yield this.roles()
      .innerJoin('role_user', 'roles.id', 'role_user.role_id')
      .innerJoin('permission_role', 'roles.id', 'permission_role.role_id')
      .innerJoin('permissions', 'permission_role.permission_id', 'permissions.id')
      .where('user_id', '=', this.id)
      .where('permission_slug', '=', perm.toLowerCase())).length

  }

  /*
  |--------------------------------------------------------------------------
  | Relationship Methods
  |--------------------------------------------------------------------------
  */
  /**
  * Many-To-Many Relationship Method for accessing the User.roles
  *
  * @return Object
  */
  roles() {
    return this.belongsToMany('App/Model/Role')
  }
}

module.exports = User
