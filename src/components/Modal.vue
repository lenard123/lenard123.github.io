<template>
<div class="fixed top-0 bottom-0 left-0 right-0 bg-black z-50 bg-opacity-25 modal" v-if="show">
    <div class="bg-white mx-auto w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 mt-20 rounded shadow-lg">
        <slot></slot>
    </div>
</div>
</template>

<style scoped>

.modal > div{
    animation-name: fade-in;
    animation-duration: 1s;
}

@keyframes fade-in {
    from{
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>

<script>
export default {
    props: ['show']
}
</script>