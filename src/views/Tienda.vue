<template>
    <NavComponent/>
    <Complemento mensaje="Escoge sabiamente" cabezera="Disfruta de los platillos"/>
    <div class="flex justify-center my-4">
        <button @click="solicitarInformacion" class="mx-2 px-4 py-2 bg-blue-500 border border-black duration-300 hover:tracking-tight text-white rounded hover:bg-blue-600">Solicitar Información</button>
    </div>
    
    <p class="font-Garamont text-4xl text-center ">Platillos Principales</p>
    <div class="flex flex-wrap justify-center w-full my-2">
      <button v-for="(platillo, index) in platillos" :key="index" @click.prevent="openDialog(platillo.ID_Producto, platillo.Nombre)" class="group w-1/4 m-2 relative block bg-black">
        <img
          :alt="platillo.ID_Producto"
          :src="platillo.ImagenURl"
          class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
        <div class="relative p-4 sm:p-6 lg:p-8">
          <p class="text-lg font-bold uppercase tracking-widest text-pink-500">S/{{ platillo.PrecioUnidad }}</p>
          <p class="text-xl font-bold text-white sm:text-2xl">{{ platillo.Nombre }}</p>
          <div class="mt-32 sm:mt-48 lg:mt-64">
            <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p class="text-sm text-white">{{ platillo.Detalle }}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
    <p class="font-Garamont text-3xl text-center ">Postres</p>
    <div class="flex flex-wrap justify-center w-full my-2">
      <button v-for="(postre, index) in postres" :key="index" @click.prevent="openDialog(postre.ID_Producto, postre.Nombre)" class="group w-1/4 m-2 relative block bg-black">
        <img
          :alt="postre.ID_Producto"
          :src="postre.ImagenURl"
          class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
        <div class="relative p-4 sm:p-6 lg:p-8">
          <p class="text-lg font-bold uppercase tracking-widest text-pink-500">S/{{ postre.PrecioUnidad }}</p>
          <p class="text-xl font-bold text-white sm:text-2xl">{{ postre.Nombre }}</p>
          <div class="mt-32 sm:mt-48 lg:mt-64">
            <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p class="text-sm text-white">{{ postre.Detalle }}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
    <p class="font-Garamont text-2xl text-center ">Bebidas</p>
    <div class="flex flex-wrap justify-center w-full my-2">
      <button v-for="(bebida, index) in bebidas" :key="index" @click.prevent="openDialog(bebida.ID_Producto, bebida.Nombre)" class="group w-1/4 m-2 relative block bg-black">
        <img
          :alt="bebida.ID_Producto"
          :src="bebida.ImagenURl"
          class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
        <div class="relative p-4 sm:p-6 lg:p-8">
          <p class="text-lg font-bold uppercase tracking-widest text-pink-500">S/{{ bebida.PrecioUnidad }}</p>
          <p class="text-xl font-bold text-white sm:text-2xl">{{ bebida.Nombre }}</p>
          <div class="mt-32 sm:mt-48 lg:mt-64">
            <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p class="text-sm text-white">{{ bebida.Detalle }}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  
    <!-- Secciones para Postres y Bebidas siguen la misma estructura -->
  
    <Dialog
      :show="showDialog"
      :title="dialogTitle"
      :productId="selectedProductId"
      @close="closeDialog"
      @accept="addOrder"
      @clear="clearOrder"
    />

    <div v-if="showInfoDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-96 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Información del Pedido</h2>
      <div v-for="info in informacionPedido" :key="info.idProducto" class="mb-2">
        <p><strong>Código del Producto:</strong> {{ info.idProducto }}</p>
        <p><strong>Precio Unitario:</strong> S/{{ info.precioUnitario }}</p>
        <p><strong>Cantidad:</strong> {{ info.cantidad }}</p>
        <p><strong>Precio Total:</strong> S/{{ info.precioTotal }}</p>
      </div>
      <p class="font-bold mt-4">Importe Total: S/{{ importeTotal }}</p>
      <form class="flex items-center" v-if="importeTotal!==0" action="." @submit.prevent="realizarPedido">
        <div>
          <label for="Comprobante">Comprobante</label>
        <select name="Comprobante" v-model="comprobante" >
          <option value="Factura">Factura</option>
          <option value="Boleta">Boleta</option>
        </select>
        </div>
        <div>
          <label for="metpag">Metodo de Pago</label>
        <select name="metpag" v-model="metodopag">
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Izipay">Izipay</option>
        </select>
        </div>
        
        <button class="mx-2 px-4 py-2 justify-end bg-green-500 text-white rounded hover:bg-green-600">Realizar Pedido</button>

      </form>
      <div class="flex justify-end mt-4">
        <button @click="closeInfoDialog" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cerrar</button>
      </div>
    </div>
  </div>
  </template>
  
  <script>
import Complemento from '@/components/Complemento.vue'
import NavComponent from '@/components/NavBar.vue'
import Dialog from '@/components/Dialog.vue'
import axios from 'axios'
import { useUserStore } from '../stores/user'

export default {
  setup() {
        const userStore = useUserStore()
        return{
            userStore,
        }
    },
  components: {
    Complemento,
    NavComponent,
    Dialog,
  },
  data() {
    return {
      platillos: [],
      bebidas: [],
      postres: [],
      Orden: [],
      showDialog: false,
      dialogTitle: '',
      selectedProductId: '',
      showInfoDialog: false,
      informacionPedido: [],
      importeTotal: 0,
      metodopag:'',
      comprobante: ''
    };
  },
  methods: {
    generarIdPedido(){
            const prefix = 'PED';
            const randomNumber = Math.floor(Math.random() * 10000); // Generates a number between 0 and 9999
            const formattedNumber = String(randomNumber).padStart(4, '0'); // Pads with leading zeros to ensure 4 digits
            return `${prefix}${formattedNumber}`;
        },
    openDialog(productId, productName) {
      this.selectedProductId = productId;
      this.dialogTitle = productName;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    addOrder(orderItem) {
      const existingItem = this.Orden.find(item => item.idProducto === orderItem.idProducto);
      if (existingItem) {
        existingItem.cantidad += orderItem.cantidad;
      } else {
        this.Orden.push(orderItem);
      }
      this.closeDialog();
    },
    clearOrder(productId) {
      this.Orden = this.Orden.filter(item => item.idProducto !== productId);
      this.closeDialog();
    },
    async obtenerPlatillos() {
      try {
        const response = await axios.get('productos/mostrar');
        this.platillos = response.data.filter(producto => producto.ID_Tipo === 1);
        this.postres = response.data.filter(producto => producto.ID_Tipo === 2);
        this.bebidas = response.data.filter(producto => producto.ID_Tipo === 3);
      } catch (error) {
        console.error(error);
      }
    },
    solicitarInformacion() {
      this.informacionPedido = this.Orden.map(item => {
        const producto = [...this.platillos, ...this.postres, ...this.bebidas].find(p => p.ID_Producto === item.idProducto);
        return {
          idProducto: item.idProducto,
          precioUnitario: producto ? producto.PrecioUnidad : 0,
          cantidad: item.cantidad,
          precioTotal: producto ? producto.PrecioUnidad * item.cantidad : 0,
        };
      });

      this.importeTotal = this.informacionPedido.reduce((total, item) => total + item.precioTotal, 0);
      this.showInfoDialog = true;
    },
    closeInfoDialog() {
      this.showInfoDialog = false;
    },
    async realizarPedido() {
      await axios.post("pedido/realizar",{
        idCliente: this.userStore.user.id_cliente,
        comprobante: this.comprobante,
        idCuenta: this.userStore.user.id_cuenta,
        idEmpleado: "RE0009",
        direccion: this.userStore.user.direccion,
        tipoPago: this.metodopag, 
        detalle: this.Orden
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
  mounted() {
    this.obtenerPlatillos();
  },
};
</script>