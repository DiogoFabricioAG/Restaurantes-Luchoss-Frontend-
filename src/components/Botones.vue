<!-- BotonConTooltip.vue -->
<template>
    <div class="tooltip">
      <a
        href="#"
        :class="buttonClass"
        class="rounded-full p-3 border-black hover:bg-violet-500 duration-150 border"
      >
        <span>
          <component :is="iconComponent" ></component>
        </span>
      </a>
      <span class="tooltiptext">{{ tooltipText }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      iconComponent: {
        type: String,
        required: true
      },
      tooltipText: {
        type: String,
        required: true
      },
      buttonClass: {
        type: String,
        default: "bg-violet-700"
      }
    }
  }
  </script>
  
  <style scoped>
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 200%; 
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  </style>
  