import Parent from '@/pages/Parent.vue'

const ManagePost = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/post/Index.vue')
const CreatePost = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/post/Create.vue')
const UpdatePost = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/post/Update.vue')

export default [
  { 
    path: 'post', 
    component: Parent,
    children: [
      { path: '', component: ManagePost, name: 'AdminManagePost'},
      { path: 'create', component: CreatePost, name: 'AdminCreatePost' },
      { path: ':id', component: UpdatePost, name: 'AdminUpdatePost' }
    ]
  }
]