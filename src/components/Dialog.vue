<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <span @click="close" class="text-xl cursor-pointer">&times;</span>
        </div>
        <div class="mb-4 text-center flex items-center justify-center">
          <button @click="decreaseCounter" class="px-4 py-2 bg-gray-300 text-black rounded-l hover:bg-gray-400">-</button>
          <p class="text-2xl mx-4">{{ counter }}</p>
          <button @click="increaseCounter" class="px-4 py-2 bg-gray-300 text-black rounded-r hover:bg-gray-400">+</button>
        </div>
        <div class="flex justify-around">
          <button @click="accept" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Aceptar</button>
          <button @click="clear" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Limpiar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      title: String,
      productId: String,
    },
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      accept() {
        this.$emit('accept', { idProducto: this.productId, cantidad: this.counter });
        this.counter = 0;
      },
      increaseCounter() {
        this.counter++;
      },
      decreaseCounter() {
        if (this.counter > 0) {
          this.counter--;
        }
      },
      clear() {
        this.$emit('clear', this.productId);
        this.counter = 0;
      },
    },
  };
  </script>