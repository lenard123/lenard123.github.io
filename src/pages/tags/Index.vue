<template>
    <div class="max-w-3xl px-4 mx-auto mb-auto sm:px-6 xl:max-w-5xl xl:px-0 pt-20">
        <div class="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-12">
            <div class="pt-6 pb-8 space-x-2 md:space-y-5">
                <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">Tags</h1>
            </div>
            <div class="flex flex-wrap max-w-lg">
                <div class="mt-2 mb-2 mr-5" v-for="tag in tags" :key="tag.name">
                    <router-link 
                        class="mr-3 text-sm font-medium uppercase text-blue-500 hover:text-blue-600" :to="{name: 'ViewTag', params: {tag: tag.name}}">
                        {{ tag.name }}
                    </router-link>
                    <router-link 
                        class="-ml-2 text-sm font-semibold text-gray-600 uppercase" 
                        :to="{name: 'ViewTag', params: {tag: tag.name}}"> 
                        ({{ tag.count }})
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    setup() {
        const store = useStore()
        const tags = computed(() => store.getters.tags)

        return { tags }
    }
}
</script>