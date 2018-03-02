<template>
    <v-app>
        <admin
            title="manablox-api-builder"
            :full-width-topbar="true"
            :sidebar-open="true"
            :sidebar-mini="false"
            :footer-fixed="true"
            :quick-edit-open="false"
        >
            <template slot="topbar-content">
                <v-btn outline icon small color="error" v-on:click="Logout">
                    <v-icon small>power_settings_new</v-icon>
                </v-btn>
            </template>

            <template slot="navigation-content">
                <sidenav :items="sidenav" v-on:link-click="OnLinkClick"/>
            </template>

            <template slot="quickedit-content">
                QUICKNAV
            </template>

            <template slot="footer-content">
                FOOTER
            </template>

            <template slot="content">
                <nuxt/>
            </template>
        </admin>
    </v-app>

</template>

<script>

export default {
    middleware: 'auth',


    data(){
        // TODO: make a dynamic theme
        // this.$vuetify.theme.accent = '#00ff00';

        return {
            sidenav: [
                {
                    type: 'link',
                    label: 'Dashboard',
                    url: '/api-builder',
                    icon: 'home'
                },

                {
                    type: 'sectionlabel',
                    label: 'Usermanagement'
                },
                {
                    type: 'divider'
                },
                {
                    type: 'link',
                    label: 'Users',
                    url: '/api-builder/users',
                    icon: 'fa-user'
                },
                {
                    type: 'link',
                    label: 'Roles',
                    url: '/api-builder/roles',
                    icon: 'fa-lock'
                },
                {
                    type: 'link',
                    label: 'Permissions',
                    url: '/api-builder/permissions',
                    icon: 'fa-shield'
                },

                {
                    type: 'sectionlabel',
                    label: 'Dataobjects'
                },
                {
                    type: 'divider'
                },
                {
                    type: 'link',
                    label: 'Models',
                    url: '/api-builder/models',
                    icon: 'home'
                },

            ]
        }
    },

    methods: {
        OnLinkClick(item){
            console.log('clicked', item);
            this.$router.push(item.url);
        },

        async Logout(){
            await this.$auth.logout();
            location.reload();
        }
    }

}
</script>
