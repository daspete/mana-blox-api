<template>
    <div>
        <panel :title="`Edit ${ role.role_title }`">
            <template slot="content">
                <v-form v-on:submit.prevent="OnFormSubmit">

                    <v-container grid-list-sm fluid>
                        <v-layout row wrap>

                            <v-flex xs12 md6>
                                <v-text-field box
                                    :disabled="isSubmitting"
                                    :loading="isSubmitting"
                                    label="Title"
                                    v-model="role.role_title"
                                    :counter="30"
                                    required
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6>
                                <v-text-field box
                                    :disabled="true"
                                    :loading="isSubmitting"
                                    label="Slug"
                                    v-model="role.role_slug"
                                ></v-text-field>
                            </v-flex>


                            <v-flex xs12>
                                <v-select dark
                                    multiple
                                    label="Permissions"
                                    :items="permissions"
                                    v-model="role.permissions"
                                    item-text="permission_title"
                                    :value-comparator="(a, b) => {return a.id == b.id }"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-container grid-list-sm fluid>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-btn color="error"
                                    nuxt to="."
                                    :disabled="isSubmitting"
                                    :loading="isSubmitting"
                                >
                                    <v-icon left dark>cancel</v-icon>
                                    Cancel
                                </v-btn>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <v-btn color="primary"
                                    :disabled="isSubmitting"
                                    :loading="isSubmitting"
                                    type="submit"
                                >
                                    <v-icon left dark>save</v-icon>
                                    Save
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-form>
            </template>
        </panel>
    </div>
</template>


<script>
export default {

    layout: 'apibuilder',

    async asyncData({ app, params }){
        let role = null
        let permissions = null

        try{
            role = await app.$axios.$get(`/api/v1/roles/${ params.id }`);
        }catch(e){
            console.log(e);
        }

        try{
            permissions = await app.$axios.$get('/api/v1/permissions');
            permissions = permissions.permissions;
        }catch(e){
            console.log(e);
        }

        return {
            role,
            permissions,
            isSubmitting: false,
            errors: []
        }
    },

    methods: {
        async OnFormSubmit(){
            this.errors = [];

            this.isSubmitting = true;

            try{
                await this.$axios.$put(`/api/v1/roles/${ this.$route.params.id }`, this.role);
                this.$router.push('.');
            }catch(e){
                this.errors = [];
                this.errors.push(e.response.data.error.message);
            }

            this.isSubmitting = false;
        }
    }

}
</script>
