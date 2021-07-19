import ViewPost from '@/pages/post/[id].vue'
import Tags from '@/pages/tags/Index.vue'
import ViewTag from '@/pages/tags/[tag].vue'
import Parent from '@/pages/Parent'
import Contact from '@/pages/Contact/Index.vue'
import Projects from '@/pages/projects/Index.vue'
import ViewProject from '@/pages/projects/[id].vue'

import UserParent from '@/pages/UserParent.vue'
import Index from '@/pages/Index.vue'

export default [  
  {
    path: '/',
    component: UserParent,
    children: [
      { path: '', component: Index, name: 'Home' },
      { path: 'post/:id', component: ViewPost, name: 'ViewPost' },
      {
        path: 'tags',
        component: Parent,
        children: [
          { path: '', component: Tags, name: 'TagList'},
          { path: ':tag', component: ViewTag, name: 'ViewTag' }
        ]
      },
      {
        path: 'projects',
        component: Parent,
        children: [
          { path: '', component: Projects, name: 'ProjectList' },
          { path: ':id', component: ViewProject, name: 'ViewProject' }
        ],
      },
      { path: 'contact', component: Contact, name: 'Contact'}
    ]
  }
]