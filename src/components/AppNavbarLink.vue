<template>
  <li 
    class="mx-auto px-3 py-1.5 rounded-full my-2 md:my-auto uppercase"
    :class="{'font-semibold text-yellow-300': isActive}"
    >
    <a :href="link">{{ label }}</a>
  </li>
</template>

<script>

export default {
  name: 'AppNavbarLink',
  props: {
    label: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: '#'
    }
  }
}

</script>