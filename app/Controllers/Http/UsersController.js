'use strict'

const User = use('App/Models/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UsersController {
    async index({ request, response }){
        const users = await User.query();

        await response.send(users); 
    }

    async create({ request, response }){

    }

    async store({ request, response }){

    }

    async show({ request, response }){

    }

    async edit({ request, response }){

    }

    async update({ request, response }){

    }

    async destroy({ request, response }){

    }
}

module.exports = UsersController