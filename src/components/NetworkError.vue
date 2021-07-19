<template>
  <div class="h-screen">
    <div class="flex h-full w-full text-center flex-col justify-center">
      <i class="fa fa-exclamation-circle text-6xl text-red-500 mb-2"></i>
      <h2 class="text-lg">There's a problem in your Internet Connection</h2>

      <button type="button" class="mx-auto transition duration-200 border bg-gray-50 border-gray-200 text-gray-500 py-2.5 px-5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block" v-if="showRetry" @click="$emit('retry')">Retry</button>

    </div>
  </div>
</template>

<script>
export default{
  props: {
    showRetry: {
      default: false
    }
  }
}
</script>