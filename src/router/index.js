import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashbord.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard-work-bench',
        component: () => import(/* webpackChunkName: "workbench" */ '../views/WorkBench.vue')
      },
      {
        path: '/manage-houses',
        name: 'manage-houses',
        component: () => import(/* webpackChunkName: "ManageHouses" */ '../views/ManageHouses.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
