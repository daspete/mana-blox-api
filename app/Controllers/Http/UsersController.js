'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Validator = use('Validator')

class UsersController {
    async index({ request, response }){
        const users = await User.all();

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
        
        if(validation.fails()){
            await response.status(401).send({ error: validation.messages()[0] })
        }else{
            await user.save();
         
            var message = {
                title: 'Success',
                text: 'User created successfully',
                type: 'success'
            }

            await response.send({ message });
        }
    }

    async show({ request, response }){

    }

    async edit({ request, response }){
        const id = request.param("id")
        const user = await User.find(id);
        if(user){
            await response.sendView('users.edit', {
                user: user,
            })
        }else{
            var message = {
                title: 'Atention!',
                text: 'Unable to find user to edit',
                type: 'warning'
            }
            //await request.with({ message: message }).flash()
            await response.status(201).send({ message });
            //response.redirect('/users')
        }    
    }

    async update({ request, response }){
        const id = request.param('id')
        const user = await User.find(id);

        if(user){
            user.username = request.input("username");
            user.email = request.input("email");

            if(request.input("password")){
                user.password = await Hash.make(request.input('password'));
            }

            var rules = {
                username: `required|unique:users,username,id,${user.id}`,
                email: `required|unique:users,email,id,${user.id}`,
            }

            var userData = request.all();
            const validation = await Validator.validate(userData, rules)
            
            if(validation.fails()){
                //await request.withOut('password').andWith({ error_message: validation.messages()[0] }).flash()
                
                await response.status(500).send({ error_message: validation.messages()[0] })
                
                //response.redirect('back')
            }else{
                await user.save();
                var message = {
                    title: 'Success',
                    text: 'User updated successfully',
                    type: 'success'
                }
                //await request.with({ message: message }).flash()
                //response.redirect('/users')

                await response.status(201).send({ message });
            }
        }else{
            var message = {
                title: 'Atention!',
                text: 'Unable to find user to update',
                type: 'warning'
            }

            //await request.with({ message: message }).flash()
            //response.redirect('/users')
            await response.status(404).send({ message });
        }
    }

    async destroy({ request, response }){
        const id = request.param('id')
        const user = await User.find(id);
        if(user){
            try{
                await user.delete()
                response.json({ success: true, message: 'User has been deleted' });
            }catch(e){
                response.json({ success: false, message: 'Error, deleting the user', error: e });
            }
        }else{
            response.json({ success: false, message: 'Unable to find user to delete' });
        }

        response.send(request.params());
    }
}

module.exports = UsersController