<template>
    <div>
        <panel :title="`Edit ${ user.username }`">
            <template slot="content">
                <v-form>
                    <v-container grid-list-sm fluid>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-text-field
                                    label="Username"
                                    v-model="user.username"
                                    :counter="10"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                    label="Email"
                                    v-model="user.email"
                                    required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-btn color="error" nuxt to=".">
                                    <v-icon left dark>cancel</v-icon>
                                    Cancel
                                </v-btn>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <v-btn color="primary">
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
        let user = await app.$axios.$get(`/api/v1/users/${ params.id }`);

        return {
            user
        }
    },

}
</script>

