<!-- a lot of the lines are just svg text, actual html is simple 
A sample contact us page form written with tailwind css
Illustration from undraw.co by the amazing Katerina Limpitsouni
-->
<template>

<Loading v-if="isLoading" class="mt-20 py-40" message="Sending message"/>
<section class="text-gray-600 body-font relative" v-else>
  <div class="container px-5 pt-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any questions, inquiry, or want to hire me. Feel free to leave a message.</p>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <form class="flex flex-wrap -m-2" @submit.prevent="submit">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required="" v-model="message.name">
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required v-model="message.email">
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required v-model="message.message"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Send</button>
        </div>
      </form>
    </div>
  </div>
</section>
</template>

<script>
import { ref, reactive } from 'vue'
import Loading from '@/components/Loading.vue'
import { sendMessage } from '@/firebase/message.js'

export default {

  components: { Loading },

  setup() {

    const isLoading = ref(false)
    const message = reactive({
      email: '',
      name: '',
      message: ''
    })

    const submit = async() => {
      try {
        isLoading.value = true
        await sendMessage(message)
        window.alert('Message sent')
        message.email = ''
        message.name = ''
        message.message = ''
      } catch (err) {
        console.log(err)
        window.alert('Message not sent')
      } finally {
        isLoading.value = false
      }
    }

    return { isLoading, message, submit }
  }
}
</script>