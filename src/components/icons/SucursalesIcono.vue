<template>
    <div class="tooltip flex items-center relative">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="24" height="24" viewBox="0 0 24 24" data-icon="SvgOfficeBuilding" aria-hidden="true"><path d="M9 15.25h0m3 0h0m3 0h0m-6-3h0m3 0h0m3 0h0m-6-3h0m3 0h0m3 0h0m-6-3h0m3 0h0m3 0h0m-3 13v2.656"></path><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect></svg>        
      </span>
      <span class="tooltiptext bg-black text-white text-center rounded-lg py-1 px-2 absolute top-[125%] left-1/2 transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 mt-2">
        Sucursales
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SucursalesIcono',
  };
  </script>