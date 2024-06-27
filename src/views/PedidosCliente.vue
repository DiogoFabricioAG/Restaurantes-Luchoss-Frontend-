<template>
    <NavComponent/>
    <Complemento mensaje="Descuida, son inversiones a futuro"/>
    <div class="font-Alata mx-3 my-5 flex text-center">
        <div class="relative overflow-x-auto my-2 w-3/5 border-r border-gray-300 justify-center">
            <p class="text-3xl my-1">Lista de Pedidos</p>
            <div class="overflow-y-auto max-h-64">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">Nombre del Pedido</th>
                            <th scope="col" class="px-6 py-3">Total (S/)</th>
                            <th scope="col" class="px-6 py-3">Estado</th>
                            <th scope="col" class="px-6 py-3">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(mipedido,index) in mispedidos" :key="index" class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">{{ mipedido.ID_Pedido }}</th>
                            <td class="px-6 py-4">{{ mipedido.Total_pagar }}</td>
                            <td class="px-6 py-4">{{mipedido.ID_Estado}}</td>
                            <td class="px-6 py-4 space-x-1 flex text-white justify-end">
                                <button v-if="mipedido.ID_Estado  < 2 " @click="abrirDialogoAgregarProducto(mipedido.ID_Pedido)" class="p-2 rounded-full bg-green-600 hover:scale-105 duration-150"><AgregarProducto/></button>
                                <button v-if="mipedido.ID_Estado  < 3" @click="ObtenerInfo(mipedido.ID_Pedido)" class="p-2 rounded-full bg-blue-600 hover:scale-105 duration-150"><InformacionIcono/></button>
                                <button v-if="mipedido.ID_Estado  < 3 " @click="abrirDialogoCancelar(mipedido.ID_Pedido)" class="p-2 rounded-full bg-red-600 hover:scale-105 duration-150"><XIcono/></button>
                                <p v-else class="text-black text-lg">Pedido Cancelado 🗑</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="detallepedido.length !== 0" class="w-2/5 text-center">
            <p class="text-3xl my-1">Detalle del Pedido</p>
            <div class="overflow-y-auto max-h-64">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">Nombre del Producto</th>
                            <th scope="col" class="px-6 py-3">Cantidad</th>
                            <th scope="col" class="px-6 py-3">Precio por ud. (S/)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detalle, index) in detallepedido" :key="index" class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ detalle.Nombre }}</th>
                            <td class="px-6 py-4">{{ detalle.Cantidad }}</td>
                            <td class="px-6 py-4">S/ {{ detalle.precio_uni }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div v-if="mostrarDialogoCancelar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl mb-4">Cancelar Pedido</h2>
            <form @submit.prevent="confirmarCancelarPedido">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <input type="text" id="username" v-model="username" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="flex justify-end space-x-4">
                    <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Confirmar Cancelación</button>
                    <button @click="cerrarDialogoCancelar" type="button" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="mostrarDialogoAgregarProducto" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl mb-4">Agregar Producto</h2>
            <form @submit.prevent="confirmarAgregarProducto">
                <div class="mb-4 overflow-y-auto max-h-64">
                    <fieldset>
                        <legend class="block text-sm font-medium text-gray-700">Selecciona un producto</legend>
                        <div v-for="producto in productos" :key="producto.ID_Producto" class="mt-2">
                            <label class="inline-flex items-center">
                                <input type="radio" :value="producto.ID_Producto" v-model="productoSeleccionado" class="form-radio text-indigo-600">
                                <span class="ml-2">{{ producto.Nombre }} - S/ {{ producto.PrecioUnidad }}</span>
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div class="mb-4">
                    <label for="cantidad" class="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input type="number" id="cantidad" v-model="cantidadProducto" min="1" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="flex justify-end space-x-4">
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Aceptar</button>
                    <button @click="cerrarDialogoAgregarProducto" type="button" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import XIcono from '@/components/icons/XIcono.vue'
import AgregarProducto from '@/components/icons/AgregarProducto.vue'
import InformacionIcono from '@/components/icons/InformacionIcono.vue'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

export default {
    components: {
        NavComponent,
        AgregarProducto,
        XIcono,
        InformacionIcono,
        Complemento,
    },
    data() {
        return {
            mispedidos: [],
            detallepedido: [],
            mostrarDialogoCancelar: false,
            pedidoSeleccionadoCancelar: null,
            username: '',
            password: '',
            productos: [],
            mostrarDialogoAgregarProducto: false,
            pedidoSeleccionadoAgregarProducto: null,
            productoSeleccionado: null,
            cantidadProducto: 1,
        }
    },
    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()
        return {
            userStore,
            toastStore
        }
    },
    methods: {
        async obtenerPlatillos() {
            try {
                const response = await axios.get('productos/mostrar');
                this.productos = response.data
            } catch (error) {
                console.error(error);
            }
        },
        async obtenerPedidos() {
            await axios.get(`mostrar/cliente?idCliente=${this.userStore.user.id_cliente}`)
                .then(response => {
                    this.mispedidos = response.data
                })
                .catch(error => {
                    console.log(error);
                })
        },
        async ObtenerInfo(id_pedido) {
            await axios.get(`mostrar/detalle?idPedido=${id_pedido}`)
                .then(response => {
                    this.detallepedido = response.data
                    this.toastStore.showToast(3000, "Datos revelados", "Surprise", 'bg-blue-600')
                })
                .catch(error => {
                    console.log(error);
                    this.toastStore.showToast(3000, "Ha ocurrido un error", "Wrong", 'bg-red-600')
                })
        },
        abrirDialogoCancelar(id_pedido) {
            this.pedidoSeleccionadoCancelar = id_pedido;
            this.mostrarDialogoCancelar = true;
        },
        cerrarDialogoCancelar() {
            this.mostrarDialogoCancelar = false;
            this.pedidoSeleccionadoCancelar = null;
            this.username = '';
            this.password = '';
        },
        async confirmarCancelarPedido() {
            if (!this.username || !this.password) {
                this.toastStore.showToast(3000, "Por favor, completa todos los campos", "Wrong", 'bg-red-600');
                return;
            }

            const data = {
                user: this.username,
                password: this.password,
                idPedido: this.pedidoSeleccionadoCancelar
            };

            await axios.put(`cuenta/cancelar`, data)
                .then(response => {

                    if (response.data !== "Error: Debe sobrepasar la hora de envío para poder cancelar" && response.data !== "Error: El usuario no existe"){
                        this.toastStore.showToast(5000, "Pedido Cancelado, que tal otros de nuestros productos 😅", "Alert", 'bg-yellow-600');
                        this.cerrarDialogoCancelar();
                        this.$router.push({name:'platillos'})
                    }   
                    else{
                        this.toastStore.showToast(3000,response.data , "Wrong", 'bg-red-600');
                        this.cerrarDialogoCancelar();
                    }
                    

                })
                .catch(error => {
                    console.log(error);
                    this.toastStore.showToast(3000, "Error al cancelar pedido", "Wrong", 'bg-red-600');
                    this.cerrarDialogoCancelar();
                }); 
        },
        abrirDialogoAgregarProducto(id_pedido) {
            this.pedidoSeleccionadoAgregarProducto = id_pedido;
            this.mostrarDialogoAgregarProducto = true;
        },
        cerrarDialogoAgregarProducto() {
            this.mostrarDialogoAgregarProducto = false;
            this.pedidoSeleccionadoAgregarProducto = null;
            this.productoSeleccionado = null;
            this.cantidadProducto = 1;
        },
        async confirmarAgregarProducto() {
            if (!this.productoSeleccionado || !this.cantidadProducto) {
                this.toastStore.showToast(3000, "Por favor, selecciona un producto y cantidad", "Wrong", 'bg-red-600');
                return;
            }

            const data = {
                idProducto: this.productoSeleccionado,
                cantidad: this.cantidadProducto
            };

            await axios.put(`pedidos/agregarProducto/${this.pedidoSeleccionadoAgregarProducto}`, data)
                .then(response => {
                    this.toastStore.showToast(5000, response.data, "Check", 'bg-green-600');
                    this.cerrarDialogoAgregarProducto();
                    this.obtenerPedidos();
                })
                .catch(error => {
                    console.log(error);
                    this.toastStore.showToast(3000, "Error al agregar producto", "Wrong", 'bg-red-600');
                    this.cerrarDialogoAgregarProducto();
                }); 
        },
    },
    mounted() {
        this.obtenerPedidos()
        this.obtenerPlatillos()
    },
}
</script>
<style scoped>
.overflow-y-auto {
    max-height: 16rem; 
}

table {
    width: 100%;
}

thead {
    position: sticky;
    top: 0;
    background-color: white; 
    z-index: 10;
}
</style>
