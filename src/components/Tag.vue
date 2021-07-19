<template>
<router-link class="mr-3 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400" :to="{name: 'ViewTag', params: {tag} }">{{ tag }}</router-link>
</template>

<script type="text/javascript">
export default { 
    props: ['tag']
}
</script>