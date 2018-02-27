<template>
    <v-app>
        <admin
            title="manablox-apibuilder"
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

    data(){
        return {
            sidenav: [
                {
                    type: 'link',
                    label: 'Dashboard',
                    url: '/apibuilder',
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
                    url: '/apibuilder/users',
                    icon: 'home'
                },
                {
                    type: 'link',
                    label: 'Roles',
                    url: '/apibuilder/roles',
                    icon: 'home'
                },
                {
                    type: 'link',
                    label: 'Permissions',
                    url: '/apibuilder/permissions',
                    icon: 'home'
                },
                
                {
                    type: 'sectionlabel',
                    label: 'Datenobjekte'
                },
                {
                    type: 'divider'
                },
                {
                    type: 'link',
                    label: 'Models',
                    url: '/apibuilder/models',
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
