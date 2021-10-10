<template>
<div class="flex flex-col h-full">
  <p class="text-xl text-center mb-2">{{ label }}</p>
  <div class="bg-white shadow-md rounded-md border border-gray-200 p-5 flex-grow grid grid-cols-3 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
    <AppSkillsCardItem
      v-for="item in items"
      :key="item.label"
      :label="item.label"
      :img="item.img"
    />
  </div>
</div>
</template>

<script>
import AppSkillsCardItem from './AppSkillsCardItem.vue'

export default {

  components: { AppSkillsCardItem },

  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>