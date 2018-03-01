'use strict'

const resolve = require('path').resolve

require('dotenv').config();

// const nodeExternals = require('webpack-node-externals')
// const path = require('path')

module.exports = {
    env: {

    },

    head: {
        titleTemplate: '%s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },

    render: {
        etag: { strong: true },
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type)
            }
        }
    },

    //loading: '',

    css: [],

    router: {
        middleware: []
    },

    srcDir: resolve(__dirname, '..', 'resources'),
    buildDir: resolve(__dirname, '..', 'compiled'),
    //buildDir: 'compiled/apibuilder',
    build: {
        babel: {
            plugins: [
                ["transform-imports", {
                    "vuetify": {
                        "transform": "vuetify/es5/components/${member}",
                        "preventFullImport": true
                    }
                }]
            ]
        },

        extractCSS: true,

        extend(config, ctx) {
            if (ctx.isServer) {
                config.externals = [
                    // nodeExternals({
                    //     whitelist: [/^vuetify/]
                    // })
                ]
            }
        }
    },

    generate: {
        routes: []
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'manablox-ui-toolkit'
    ],

    plugins: [

    ],

    auth: {
        endpoints: {
            login: {
                url: '/api/v1/auth/login',
                method: 'post',
                propertyName: 'token'
            },
            user: {
                url: '/api/v1/auth/me',
                method: 'get',
                propertyName: 'user'
            }
        },

        token: {
            type: 'Bearer',
            name: 'token'
        },

        cookie: {
            name: 'token',
            options: {
                path: '/'
            }
        },

        fetchUserOnLogin: false,

        redirect: {
            login: '/api-builder/login',
            home: '/api-builder'
        }

    }


};

