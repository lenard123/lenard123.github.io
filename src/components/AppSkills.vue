<template>
<section id="skills" class="py-24 bg-gray-50">

  <div class="container mx-auto px-5">

    <div class="text-center mb-5">
      <h1 class="text-purple-900 font-black text-4xl">My Skill Set</h1>
      <p class="text-gray-500">Languanges and Frameworks I'm capable of</p>
    </div>

    <div class="text-gray-700 grid gap-10 md:grid-cols-3">
      <AppSkillsCard 
        v-for="skill in skills"
        :key="skill.label"
        :label="skill.label"
        :items="skill.items"
      />
    </div>

  </div>
</section>
</template>

<script>
import skills from '../data/skills.js'
import AppSkillsCard from './AppSkillsCard.vue'

export default {

  components: {
    AppSkillsCard
  },

  setup() {

    return { 
      skills 
    }
  }
}
</script>