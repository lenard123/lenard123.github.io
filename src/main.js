import './styles/index.css'
import { createApp } from 'vue'
import App1 from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import Pill from '@/components/Pill.vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(CKEditor)

app.component('Pill',Pill)

app.mount('#app')
