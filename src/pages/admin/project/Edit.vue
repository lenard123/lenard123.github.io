<template>
<!-- breadcrumb -->
<nav class="text-sm font-semibold mb-3" aria-label="Breadcrumb">
  <ol class="list-none p-0 inline-flex">
    <li class="flex items-center text-blue-500">
      <router-link :to="{name: 'AdminManageProjects'} " class="text-gray-600">Manage Project</router-link>
      <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
    </li>
    <li class="flex items-center">
      <a href="#" class="text-gray-500">Edit Project</a>
    </li>
  </ol>
</nav>
<!-- breadcrumb end -->

<Loading class="py-16" v-if="isLoading"/>

<div class="py-12" v-else>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Header Image</label>
                        <input type="file" @change="previewImage" style="visibility: hidden;" ref="inputFile"/>
                        <div class="sm:w-1/2">
                            <div
                                class="w-full relative h-0" 
                                style="padding-bottom: 56.25%;">
                                <div class="rounded border-4 border-gray-300 hover:border-gray-500 border-dashed absolute h-full w-full top-0 left-0 flex justify-center text-gray-500 hover:text-gray-700" @click="chooseImage">
                                    <img :src="preview" class="h-full w-auto" v-if="preview !== null" @click="chooseImage"/>
                                    
                                    <span class="self-center" @click="chooseImage" v-else>Click here to upload Image</span>
                                </div>
                            </div>
                        </div>
                    </div>                  
                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Name <span class="text-red-500">*</span></label><br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" required v-model="project.name">
                    </div>

                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Description</label><br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" required v-model="project.description">
                    </div>
                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Details <span class="text-red-500">*</span></label><br>
                        <ckeditor class="border-2 border-gray-300 w-full" v-model="project.details"/>
                    </div>
                    <div class="mb-8">
                        <label class="text-xl text-gray-600">Tags</label><br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full uppercase" required placeholder="Separate tags using comma" v-model="project.tags">
                    </div>

                    <div class="flex justify-between">
                        <div class="self-center">
                            <div :class="{'hidden': !isSubmitting }">
                                Saving Post <i class="fa fa-spinner spin"></i>
                            </div>
                        </div>
                        <div class="flex p-1">
                            <select class="border-2 border-gray-300 border-r p-2" v-model="project.status">
                                <option value="published">Save and Publish</option>
                                <option value="draft">Save Draft</option>
                            </select>
                            <button role="submit" class="p-3 bg-blue-500 text-white hover:bg-blue-400" required :disabled="isSubmitting">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Loading from '@/components/Loading.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProject, updateProject } from '@/firebase/project.js'
import CustomCKEditor from '../components/CustomCKEditor.vue'

export default {
  components: { Loading, ckeditor: CustomCKEditor },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const project = reactive({})
    const inputFile = ref(null)
    const preview = ref(null)
    const id = route.params.id

    const submit = async() => {
      isSubmitting.value = true
      await updateProject(project)
      isSubmitting.value = false
      window.alert('Project updated successfully')
      router.push({name: 'AdminManageProjects'})
    }

    const chooseImage = (e) => {
        e.cancelBubble = true
        inputFile.value.click()
    }

    const previewImage = () => {
        const [file] = inputFile.value.files
        if (file) {
            preview.value = URL.createObjectURL(file)
            project.image = file
        }
    }

    onMounted(async() => {
      Object.assign(project, await fetchProject(id))
      preview.value = project.image
      isLoading.value = false
    })


    return { 
      isLoading, 
      project, 
      submit, 
      isSubmitting, 
      chooseImage, 
      previewImage, 
      preview,
      inputFile
    }
  }
}

</script>