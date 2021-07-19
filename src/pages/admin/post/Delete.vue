<template>
<Modal :show="isOpen">
    <div class="px-4 py-4">
        <h1 class="text-xl text-gray-700 pb-4 border-b border-gray-300 mb-4">
            Are you sure to delete this post?
        </h1>

        <form @submit.prevent="submit">
            <label class="text-sm text-gray-600 pb-1 block">
                Type "CONFIRM" to proced
            </label>
            <input type="text" v-model="confirm" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required="" />
        

            <div class="flex justify-between">
                <div class="self-center">
                    <span :class="{'hidden': !isLoading }">
                        Deleting Post <i class="ml-2 fa fa-spinner spin"></i>
                    </span>
                </div>
                <div>
                    <button type="button" class="px-4 py-2 border border-gray-500 rounded text-gray-500 mr-2 text-sm hover:text-white hover:border-white hover:bg-gray-500 focus:bg-gray-600 focus:text-white" @click="close">Cancel</button>
                    <button class="px-4 py-2 rounded text-white bg-red-500  text-sm hover:bg-red-600 focus:bg-red-700 disabled:bg-red-400">Delete</button>
                </div>
            </div>
        </form>

    </div>
</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import { deletePost } from '@/firebase/post.js'

export default {
    components: { Modal },

    setup(props, context) {

        const isOpen = ref(false)
        const postId = ref(null)
        const isLoading = ref(false)
        const confirm = ref('')


        const open = (id) => {
            isOpen.value = true
            confirm.value = ''
            isLoading.value = false
            postId.value = id
        }

        const close = () => {
            if(isLoading.value) return
            isOpen.value = false
        }

        const submit = async() => {
            if (confirm.value !== 'CONFIRM' || isLoading.value) return
            isLoading.value = true
            await deletePost(postId.value)
            isLoading.value = false
            context.emit('delete', postId)
            window.alert('Post deleted successfully')
            close()
        }

        return {
            open,
            isOpen,
            confirm,
            submit,
            isLoading,
            close
        }
    }
}

</script>