<template>
<div class="inline-block text-center">
  <img :src="img" class="h-12 mx-auto">
  <span>{{ label }}</span>
</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>