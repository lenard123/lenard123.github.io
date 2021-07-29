<template>
<section id="about" class="container mx-auto px-5 py-24 max-w-screen-lg">
  <div class="text-center mb-5">
    <h1 class="text-purple-900 font-black text-4xl">About me</h1>
    <p class="text-gray-500">Get to know me</p>
  </div>

  <div class="grid gap-5 md:grid-cols-4">
    <img :src="'./img/me.png'" class="w-36 md:w-full h-auto px-5"/>

    <div class="text-justify text-gray-700 font-light text-lg col-span-3">
      <p class="font-bold text-xl mb-4">Who am I?</p>

      <!-- Thanks to [wloisv@gmail.com] for correcting my mistakes -->
      <p class="mb-4">Hey there! I'm Lenard Mangay-ayam, a web developer based in the historic city of Caloocan.</p>

      <p class="mb-4">I'm 19 Years old and currently a 3rd year Computer Science student at University of Caloocan City. I have been coding for 5 years and have learned a lot of things along the way.</p>

      <p class="mb-4">I am in love with web development as it is a way for me to express myself, my talents, and my skills by creating applications that many people can benefit from.</p>

      <a href="#" class="bg-purple-700 text-white text-sm inline-block py-2 px-4 rounded-lg border-purple-900 hover:bg-purple-900">Download CV</a>
    </div>

  </div>
</section>
</template>