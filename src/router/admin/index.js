const Dashboard = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/components/Dashboard.vue')
const Home = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/Home.vue')
const Login = () => import(/* webpackChunkName: "admin" */ '@/pages/Login/Index.vue')

import postRoutes from './post.js'
import messageRoutes from './message.js'
import projectRoutes from './project.js'

export default [
  {
    path: '/admin',
    component: Dashboard,
    children: [
      { 
        path: '', 
        component: Home, 
        name: 'AdminHome'
      },
      ...postRoutes,
      ...messageRoutes,
      ...projectRoutes,
    ]
  },

  {
    path: '/login',
    component: Login,
    name: 'AdminLogin'
  }
]