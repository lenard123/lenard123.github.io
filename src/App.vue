<template>

<AppNavbar :sections="sections"/>
<AppHeader />
<AppAbout :ref="sections[0]"/>
<AppSkills :ref="sections[1]"/>
<AppPortfolio :ref="sections[2]"/>
<AppContact :ref="sections[3]" />
<AppFooter />
</template>

<script>

import AppNavbar from './components/AppNavbar.vue'
import AppHeader from './components/AppHeader.vue'
import AppAbout from './components/AppAbout.vue'
import AppSkills from './components/AppSkills.vue'
import AppPortfolio from './components/AppPortfolio.vue'
import AppContact from './components/AppContact.vue'
import AppFooter from './components/AppFooter.vue'

import { reactive, ref } from 'vue'

export default {
  components: { 
    AppNavbar,
    AppHeader,
    AppAbout,
    AppSkills,
    AppPortfolio,
    AppContact,
    AppFooter
 },

 setup() {
  const sections = reactive([
    ref(null),
    ref(null),
    ref(null),
    ref(null)
  ])

  return {  
    sections
  }
 }

}

</script>