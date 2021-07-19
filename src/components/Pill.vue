<template>
<span 
    class="relative inline-block px-3 py-1 font-semibold leading-tight"
    :class="{
        'text-green-900': type === 'success' || type === 'published',
        'text-yellow-900': type === 'warning' || type === 'draft',
        'text-red-900': type === 'danger',
        'text-blue-900': type === 'info'
    }"
>
    <span 
        aria-hidden="true" 
        class="absolute inset-0 opacity-50 rounded-full"
        :class="{
            'bg-green-200': type === 'success' || type === 'published',
            'bg-yellow-200': type === 'warning' || type === 'draft',
            'bg-red-200': type === 'danger',
            'bg-blue-200': type === 'info'
        }"
    >
    </span>
    <span class="relative">
        <slot></slot>
    </span>
</span>
</template>

<script>

export default {
    props: {
        type: { default: 'info' }
    }
}

</script>