<template>

<div class="bg-indigo-900 relative overflow-hidden h-screen">
    <img :src="background" class="absolute h-full w-full object-cover"/>
    <div class="inset-0 bg-black opacity-25 absolute">
    </div>
    <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="w-full font-mono flex flex-col items-center relative z-10">
            <h1 class="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                You&#x27;re alone here
            </h1>
            <p class="font-extrabold text-8xl my-44 text-white animate-bounce">
                404
            </p>
        </div>
    </div>
</div>

</template>

<script>
import background from '@/assets/landscape1.svg'

export default {
    setup(){
        return { background }
    }
}

</script>