<template>
    <div>
        <panel title="Users">
            <template slot="header">
                <v-btn icon nuxt to="users/create">
                    <v-icon color="white">fa-user-plus</v-icon>
                </v-btn>
            </template>
            <template slot="content">
                <v-alert
                    type="error"
                    :value="true"
                    v-if="error"
                    v-for="(error, errorId) in errors"
                    :key="`error-${errorId}`">
                    {{ error }}
                </v-alert>

                <v-data-table v-if="items"
                    v-model="selected"
                    :items="items"
                    item-key="id"
                >
                    <template slot="headers" slot-scope="props">
                        <tr>
                            <th class="text-xs-left" width="50">
                                <v-checkbox
                                    primary
                                    hide-details
                                    v-on:click.native="ToggleAll"
                                    :input-value="props.all"
                                    :indeterminate="props.indeterminate"
                                ></v-checkbox>
                            </th>

                            <th class="text-xs-left" width="50">ID</th>
                            <th class="text-xs-left">Username</th>
                            <th class="text-xs-left">Email</th>
                            <th class="text-xs-left" width="150">Last edited</th>
                            <th class="text-xs-right" width="140">Actions</th>
                        </tr>
                    </template>

                    <template slot="items" slot-scope="props">
                        <tr :active="props.selected">
                            <td class="text-xs-left">
                                <v-checkbox
                                    v-on:click="props.selected = !props.selected"
                                    primary
                                    hide-details
                                    :input-value="props.selected"
                                ></v-checkbox>
                            </td>
                            <td class="text-xs-left">{{ props.item.id }}</td>
                            <td class="text-xs-left">{{ props.item.username }}</td>
                            <td class="text-xs-left">{{ props.item.email }}</td>
                            <td class="text-xs-left">{{ props.item.updated_at }}</td>
                            <td class="text-xs-right">
                                <v-btn icon small outline color="teal" v-on:click.prevent="EditItem(props.item)">
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                                <v-btn icon small outline color="red" v-on:click.prevent="DeleteItem(props.item)">
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                    </template>

                </v-data-table>

                <v-bottom-sheet v-model="showDeleteConfirm" ref="confirmbottom">
                    <v-card dark class="text-xs-center py-3">
                        <div class="pb-1">ARE YOU SURE?</div>
                        <v-btn
                            color="error"
                            :loading="isDeleting"
                            @click.native="OnDeleteItemConfirm"
                            :disabled="isDeleting"
                        >
                            YES
                        </v-btn>
                        <v-btn :disabled="isDeleting" v-on:click="showDeleteConfirm = false">
                            NO
                        </v-btn>
                    </v-card>
                </v-bottom-sheet>

            </template>
        </panel>
    </div>
</template>

<script>
export default {
    layout: 'apibuilder',

    async asyncData({ app }){
        let users = null;
        let errors = null;

        try{
            users = await app.$axios.$get('/api/v1/users');
        }catch(e){
            errors = [];
            errors.push(e.response.data.error.message);
        }

        return {
            errors: errors,
            showDeleteConfirm: false,
            isDeleting: false,
            current: null,
            selected: [],
            items: users
        }
    },

    methods: {
        ToggleAll(){
            if(this.selected.length) this.selected = [];
            else this.selected = this.items.slice();
        },

        EditItem(item){
            this.$router.push('./users/' + item.id);
        },

        DeleteItem(item){
            this.isDeleting = false;
            this.current = item;
            this.showDeleteConfirm = true;
        },

        async OnDeleteItemConfirm(){
            this.isDeleting = true;

            try {
                await this.$axios.$delete(`/api/v1/users/${ this.current.id }`);
            }catch(e){
                console.log(e);
            }


            this.isDeleting = false;
            this.items.splice(this.items.indexOf(this.current), 1);

            this.showDeleteConfirm = false;
        }
    }
}
</script>

