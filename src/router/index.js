import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/:page?/:id?',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  }, {
    path: '/:id?',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
