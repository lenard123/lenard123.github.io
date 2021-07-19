<template>
<!-- breadcrumb -->
<nav class="text-sm font-semibold mb-3" aria-label="Breadcrumb">
  <ol class="list-none p-0 inline-flex">
    <li class="flex items-center text-blue-500">
      <router-link :to="{name: 'AdminManagePost'} " class="text-gray-600">Manage Post</router-link>
      <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
    </li>
    <li class="flex items-center">
      <a href="#" class="text-gray-500">Create Post</a>
    </li>
  </ol>
</nav>
<!-- breadcrumb end -->

<!-- component -->
<div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form @submit.prevent="submit">
                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Title <span class="text-red-500">*</span></label><br>
                            <input type="text" class="border-2 border-gray-300 p-2 w-full" name="title" id="title" required v-model="post.title">
                        </div>

                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Description</label><br>
                            <input type="text" class="border-2 border-gray-300 p-2 w-full" name="description" id="description" required v-model="post.description">
                        </div>
                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Content <span class="text-red-500">*</span></label><br>
                            <ckeditor v-model="post.content" class="border-2 border-gray-300 w-full"/>
                        </div>

                        <div class="mb-8">
                            <label class="text-xl text-gray-600">Tags</label><br>
                            <input type="text" class="border-2 border-gray-300 p-2 w-full uppercase" name="tags" id="tags" required v-model="post.tags" placeholder="Separate tags using comma">
                        </div>

                        <div class="flex justify-between">

                            <div class="self-center">
                                <div :class="{'hidden': !isPageLoading }">
                                    Saving Post <i class="fa fa-spinner spin"></i>
                                </div>
                            </div>

                            <div class="flex p-1">
                                <select class="border-2 border-gray-300 border-r p-2" name="action" v-model="post.status">
                                    <option value="published">Save and Publish</option>
                                    <option value="draft">Save Draft</option>
                                </select>
                                <button role="submit" class="p-3 bg-blue-500 text-white hover:bg-blue-400" required :disabled="isPageLoading">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/firebase/post.js'
import { usePageStateManager } from '@/mixins'
import CustomCKEditor from '../components/CustomCKEditor.vue'

export default {

    components: { ckeditor: CustomCKEditor },

    setup() {

        const router = useRouter()

        const { setPageLoading, setPageSuccess, isPageLoading } = usePageStateManager()

        const post = reactive({
            title: '',
            description: '',
            content: '',
            status: 'draft',
            tags: ''
        })

        const submit = async() => {
            setPageLoading()
            await createPost(post)
            setPageSuccess()
            window.alert('Post saved successfully')
            router.push({name: 'AdminManagePost'})
        }

        return { submit, isPageLoading, post }
    }
}
</script>