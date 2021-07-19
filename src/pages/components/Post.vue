<template>

<div class="py-4">
  <article class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
    <dl>
      <dt class="sr-only">Published on</dt>
      <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
        <time datetime="2021-02-21">{{ parseDate(post.createdAt) }}</time>
      </dd>
    </dl>
    <div class="space-y-3 xl:col-span-3">
      <div>
        <h3 class="text-2xl font-bold leading-8 tracking-tight">
          <router-link 
            class="text-gray-900 dark:text-gray-100"
            :to="{name: 'ViewPost', params:{id: post.id}}">{{ post.title }}</router-link>
        </h3>
        <div class="flex flex-wrap">
          <Tag v-for="tag in post.tags" :key="tag" :tag="tag" />
        </div>
      </div>
      <div class="prose text-gray-500 max-w-none dark:text-gray-400">{{ post.description }}</div>

      <div class="text-base font-medium leading-6">
        <router-link 
          class="text-green-500 hover:text-green-600"
          :to="{name: 'ViewPost', params:{id: post.id}}">Read more →</router-link>
      </div>

    </div>
  </article>
</div>
</template>

<script>

import { useStore } from 'vuex'
import { computed } from 'vue'
import { parseDate } from '@/util/index.js'
import Tag from '@/components/Tag.vue'

export default {

  props: ['post'],

  components: { Tag },

  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const isLoggedIn = computed(() => !!user.value)

    return { isLoggedIn, parseDate }
  }
}

</script>