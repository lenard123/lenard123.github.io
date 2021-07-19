import Parent from '@/pages/Parent.vue'

const ManageProjects = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/project/Index.vue')
const AddProject = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/project/Add.vue')
const EditProject = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/project/Edit.vue')

export default [
  {
    path: 'projects',
    component: Parent,
    children: [
      { path: '', component: ManageProjects, name: 'AdminManageProjects' },
      { path: 'add', component: AddProject, name: 'AdminAddProject' },
      { path: ':id', component: EditProject, name: 'AdminEditProject' }
    ]
  }
]