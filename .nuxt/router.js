import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _23e460e7 = () => import('../resources/pages/api-builder/index.vue' /* webpackChunkName: "pages/api-builder/index" */).then(m => m.default || m)
const _4f519040 = () => import('../resources/pages/api-builder/users/index.vue' /* webpackChunkName: "pages/api-builder/users/index" */).then(m => m.default || m)
const _0c691cc8 = () => import('../resources/pages/api-builder/permissions/index.vue' /* webpackChunkName: "pages/api-builder/permissions/index" */).then(m => m.default || m)
const _d3388030 = () => import('../resources/pages/api-builder/models/index.vue' /* webpackChunkName: "pages/api-builder/models/index" */).then(m => m.default || m)
const _64dd9a55 = () => import('../resources/pages/api-builder/roles/index.vue' /* webpackChunkName: "pages/api-builder/roles/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/api-builder",
			component: _23e460e7,
			name: "api-builder"
		},
		{
			path: "/api-builder/users",
			component: _4f519040,
			name: "api-builder-users"
		},
		{
			path: "/api-builder/permissions",
			component: _0c691cc8,
			name: "api-builder-permissions"
		},
		{
			path: "/api-builder/models",
			component: _d3388030,
			name: "api-builder-models"
		},
		{
			path: "/api-builder/roles",
			component: _64dd9a55,
			name: "api-builder-roles"
		}
    ],
    
    
    fallback: false
  })
}
