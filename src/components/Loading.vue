<template>
  <div>
    <div class="flex h-full w-full text-center flex-col justify-center content-center">
      <i class="fa fa-spinner spin text-4xl mx-auto"></i>
      <h2 class="text-lg">{{ message }}</h2>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    message: {
      default: 'Please wait a moment'
    }
  }
}
</script>