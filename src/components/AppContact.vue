<template>
<section id="contact" class="container mx-auto px-5 pt-24 max-w-screen-md">

  <div class="text-center mb-8">
    <h1 class="text-purple-900 font-black text-4xl">Contact me</h1>
    <p class="text-gray-500">If you have any questions, inquiry, or want to hire me. Feel free to leave a message.</p>
  </div>

  <form class="grid grid-cols-2 gap-4" @submit.prevent="submitData">

    <div class="col-span-2 md:col-span-1">
      <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
      <input type="text" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required="" v-model="data.name">
    </div>

    <div class="col-span-2 md:col-span-1">
      <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
      <input type="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required="" v-model="data.email">
    </div>

    <div class="col-span-2">
      <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
      <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required="" v-model="data.message"></textarea>
    </div>

    <div class="col-span-2">
      <button class="flex ml-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
        <span v-if="!isSending">
          Send
          <svg class="inline ml-2 my-auto h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg>
        </span>
        <span v-else>
          Sending
          <svg class="spin inline ml-2 my-auto h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 48c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-40 376c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm248-168c0-22.091-17.909-40-40-40s-40 17.909-40 40 17.909 40 40 40 40-17.909 40-40zm-416 0c0-22.091-17.909-40-40-40S8 233.909 8 256s17.909 40 40 40 40-17.909 40-40zm20.922-187.078c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40c0-22.092-17.909-40-40-40zm294.156 294.156c-22.091 0-40 17.909-40 40s17.909 40 40 40c22.092 0 40-17.909 40-40s-17.908-40-40-40zm-294.156 0c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z"/></svg>
        </span>
      </button>
    </div>

  </form>

</section>
</template>

<script>

import { reactive, ref } from 'vue'
import sendMessage from '../features/sendMessage.js'

export default {
  setup() {
    const data = reactive({
      name: null,
      email: null,
      message: null
    }) 

    const { isSending, submitData } = sendMessage(data)

    return { 
      data,
      submitData,
      isSending
    }
  }
}

</script>