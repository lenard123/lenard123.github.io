<template>
<section id="portfolio" class="container mx-auto px-5 pt-24  max-w-screen-lg">
  <div class="text-center mb-5">
    <h1 class="text-purple-900 font-black text-4xl">Projects</h1>
    <p class="text-gray-500">Lists of Apps and System that I created.</p>
  </div>

  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <AppPortfolioCard 
      v-for="project in projects"
      :key="project.title"
      :project="project"
    />
  </div>

</section>
</template>

<script>
import AppPortfolioCard from './AppPortfolioCard.vue'
import projects from '../data/projects.js'

export default {
  components: {
    AppPortfolioCard
  },

  setup() {
    return {
      projects
    }
  }
}

</script>