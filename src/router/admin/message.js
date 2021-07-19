import Parent from '@/pages/Parent.vue'

const Inbox = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/message/Index.vue')
const ViewMessages = () => import(/* webpackChunkName: "admin" */ '@/pages/admin/message/ViewMessages.vue')

export default [
  {
    path: 'messages',
    component: Parent,
    children: [
      { path: '', component: Inbox, name: 'AdminInbox' },
      { path: ':email', component: ViewMessages, name: 'AdminViewMessages' }
    ]
  }
]