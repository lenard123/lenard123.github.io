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

      <p class="mb-4">I am Lenard Mangay-ayam, A Web Developer.</p>

      <p class="mb-4">I'm Currently Residing at Caloocan City in the Philippines. 19 Years old and currently a 3rd Year Computer Science student at University of Caloocan City. I have been coding for 5 years and have learned a lot of things a long the way.</p>

      <p class="mb-4">I am inlove with Web Development because it is a way for me to express my talent and skills and to create an application that many people can benefit.</p>

      <a href="#" class="bg-purple-700 text-white text-sm inline-block py-2 px-4 rounded-lg border-purple-900 hover:bg-purple-900">Download CV</a>
    </div>

  </div>
</section>
</template>