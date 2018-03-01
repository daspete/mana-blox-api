<template>
    <div>
        <panel :title="`Edit ${ user.username }`">
            <template slot="content">
                <v-form v-on:submit.prevent="OnFormSubmit">
                    <v-tabs
                        color="grey darken-2"
                        slider-color="primary"
                    >
                        <v-tab ripple>
                            Account data
                        </v-tab>
                        <v-tab ripple>
                            Personal data
                        </v-tab>

                        <v-tab-item>
                            <v-container grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            label="Username"
                                            v-model="user.username"
                                            :counter="30"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            label="Email"
                                            v-model="user.email"
                                            required
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12>
                                        Enter a new password or leave it blank
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            v-model="user.password"
                                            :type="showPassword ? 'text' : 'password'"
                                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => { showPassword = !showPassword }"
                                            label="Password"
                                            :min="8"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            v-model="user.password_confirm"
                                            :type="showPasswordConfirm ? 'text' : 'password'"
                                            :append-icon="showPasswordConfirm ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => { showPasswordConfirm = !showPasswordConfirm }"
                                            label="Confirm password"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-select
                                            label="User role"
                                            :items="[
                                                { text: 'bla' },
                                                { text: 'blubb' }
                                            ]"
                                            v-model="user.roles"
                                            item-value="text"
                                    ></v-select>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container grid-list-sm fluid>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-flex xs12 md4>
                                            Gender
                                            <v-radio-group
                                                :disabled="isSubmitting"
                                                :loading="isSubmitting"
                                                v-model="user.gender"
                                                row
                                            >
                                                <v-radio label="Female" value="female" ></v-radio>
                                                <v-radio label="Male" value="male"></v-radio>
                                            </v-radio-group>
                                        </v-flex>
                                    </v-flex>

                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            label="First name"
                                            v-model="user.first_name"
                                            :counter="80"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-text-field box
                                            :disabled="isSubmitting"
                                            :loading="isSubmitting"
                                            label="Last name"
                                            v-model="user.last_name"
                                            :counter="80"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-tab-item>
                    </v-tabs>
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
        let user = await app.$axios.$get(`/api/v1/users/${ params.id }`);

        return {
            user,
            isSubmitting: false,
            showPassword: false,
            showPasswordConfirm: false,
            errors: []
        }
    },

    methods: {
        async OnFormSubmit(){
            this.errors = [];

            this.isSubmitting = true;

            try{
                await this.$axios.$put(`/api/v1/users/${ this.$route.params.id }`, this.user);
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

