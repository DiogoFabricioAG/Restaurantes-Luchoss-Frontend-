<template>
    <div class="tooltip flex items-center relative">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-chef-hat"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z"
          />
          <path d="M6.161 17.009l11.839 -.009" />
        </svg>
      </span>
      <span class="tooltiptext bg-black text-white text-center rounded-lg py-1 px-2 absolute top-[125%] left-1/2 transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 mt-2">
        Empleados
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChefIcon',
  };
  </script>
  