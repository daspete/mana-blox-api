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
                TOP
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
                    icon: 'home'
                },
                {
                    type: 'link',
                    label: 'Roles',
                    url: '/api-builder/roles',
                    icon: 'home'
                },
                {
                    type: 'link',
                    label: 'Permissions',
                    url: '/api-builder/permissions',
                    icon: 'home'
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
        }
    }

}
</script>
