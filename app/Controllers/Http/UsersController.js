'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Validator = use('Validator')

class UsersController {
    async index({ request, response }){
        const users = await User.query();

        await response.send(users); 
    }

    async create({ request, response }){

    }

    async store({ request, response }){
        const user = new User;
        user.username = request.input("username");
        user.email = request.input("email");

        user.password = request.input('password');

        var userData = request.all();
        const validation = await Validator.validate(userData, User.rules)
        if (validation.fails()) {
            //await request.withOut('password').andWith({ error_message: validation.messages()[0] }).flash()
            //response.redirect('back')
            await response.status(401).send({ error: validation.messages()[0] })
        } else {
            await user.save();
            var message = {
                title: 'Success',
                text: 'User created successfully',
                type: 'success'
            }
            //await request.with({ message: message }).flash()
            //response.redirect('/users')

            await response.send({ message });
        }
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