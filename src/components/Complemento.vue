<template>
    <section class="font-Alata mx-auto text-center my-5">
        <p class="font-Tenali text-3xl ">{{ cabezera }}</p>
        <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
        <span class="flex items-center">
      <span class="h-px flex-1 bg-black"></span>
      <span class="shrink-0 px-6 font-Niconne text-lg">{{ mensaje }}</span>
      <span class="h-px flex-1 bg-black"></span>
    </span>
    </section>
</template>

<script>

export default{
    props: [
        'cabezera',
        'mensaje',
    ],
}
</script>