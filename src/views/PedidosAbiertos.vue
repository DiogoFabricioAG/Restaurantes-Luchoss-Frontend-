<template>
    <NavComponent/>
    <Complemento mensaje="Administracion" cabezera="Lista de Pedidos Abiertos"/> 
    
    <div class="w-[90%] mx-auto">
        <div class="rounded-lg border border-gray-200">
            <div class="overflow-x-auto rounded-t-lg">
                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead class="ltr:text-left rtl:text-right select-none text-end">
                    <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cod. Pedido</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Comprobante</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cod. Empleado</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fecha Registrada</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Direccion</th>

                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Estado</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Importe Total</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cambiar Estado</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(pedido, index) in pedidosPaginados" :key="index" class="text-end">
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ pedido.ID_Pedido }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Comprobante }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.ID_Empleado }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Fecha_Registrada }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Direccion }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.ID_Estado }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">S/{{ pedido.Total_pagar }}</td>
                        <td class="flex justify-center mx-3 my-1">    
                            <button @click="abrirDialogoConfirmacion(pedido.ID_Pedido)" class="size-7 border flex justify-center text-white items-center hover:bg-yellow-600 duration-150 border-black bg-yellow-500 rounded-full">
                                <ProseguirIcono/>
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
                <ol class="flex justify-end gap-1 text-xs font-medium">
                <li>
                    <button
                    @click="cambiarPagina(paginaActual - 1)"
                    :disabled="paginaActual === 1"
                    class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                    <span class="sr-only">Prev Page</span>
                    <AtrasIcon/>
                    </button>
                </li>

                <li>
                    <p
                    class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    >
                    {{ paginaActual }}
                    </p>
                </li>
                <li>
                    <button
                    @click="cambiarPagina(paginaActual + 1)"
                    :disabled="paginaActual >= totalPaginas"
                    class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                    <span class="sr-only">Next Page</span>
                    <SiguienteIcon/>
                    </button>
                </li>
                </ol>
            </div>
        </div>
    </div>

    <!-- Dialogo de Confirmacion -->
    <div v-if="mostrarDialogo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl mb-4">Confirmar Acción</h2>
            <p class="mb-4">¿Estás seguro que deseas cambiar el estado de este pedido?</p>
            <div class="flex justify-end space-x-4">
                <button @click="confirmarCambioEstado" class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">
                    Sí, cambiar estado
                </button>
                <button @click="cerrarDialogo" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import ProseguirIcono from '@/components/icons/ProseguirIcono.vue'
import SiguienteIcon from '@/components/icons/Siguiente.vue'
import AtrasIcon from '@/components/icons/Atras.vue'
import axios from 'axios'

export default {
    components: {
        NavComponent,
        Complemento,
        ProseguirIcono,
        SiguienteIcon,
        AtrasIcon
    },
    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()
        return {
            userStore,
            toastStore
        }
    },
    data() {
        return {
            pedidos_mostrar: [],
            entregados: [],
            cancelados: [],
            mostrarEntregados: false,
            paginaActual: 1,
            elementosPorPagina: 7,
            mostrarDialogo: false,
            pedidoSeleccionado: null,
        }
    },
    computed: {
        totalPaginas() {
            return Math.ceil(this.pedidos_mostrar.length / this.elementosPorPagina);
        },
        pedidosPaginados() {
            const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
            const fin = inicio + this.elementosPorPagina;
            return this.pedidos_mostrar.slice(inicio, fin);
        }
    },
    methods: {
        async obtenerPedidos() {
            await axios.get('mostrar/pedidos')
                .then(response => {
                    this.entregados = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            this.pedidos_mostrar = this.entregados
        },
        cambiarPagina(nuevaPagina) {
            if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
                this.paginaActual = nuevaPagina;
            }
        },
        abrirDialogoConfirmacion(idPedido) {
            this.pedidoSeleccionado = idPedido;
            this.mostrarDialogo = true;
        },
        cerrarDialogo() {
            this.mostrarDialogo = false;
            this.pedidoSeleccionado = null;
        },
        async confirmarCambioEstado() {
            const pedido = this.pedidos_mostrar.find(p => p.ID_Pedido === this.pedidoSeleccionado);
            if (pedido && pedido.ID_Estado < 3) {
                pedido.ID_Estado += 1;
                await axios.post(`estado/cambiar/${this.pedidoSeleccionado}`, { estado: pedido.ID_Estado })
                    .then(response => {
                        this.toastStore.showToast(3000, response.data, "Check", 'bg-green-600');
                        if (pedido.ID_Estado === 3) {
                            this.pedidos_mostrar = this.pedidos_mostrar.filter(p => p.ID_Pedido !== this.pedidoSeleccionado);
                        }
                        this.cerrarDialogo();
                    })
                    .catch(error => {
                        this.toastStore.showToast(3000, error.response.data, "Wrong", 'bg-red-600');
                        this.cerrarDialogo();
                    });
            } else {
                this.toastStore.showToast(3000, "Estado no válido", "Error", 'bg-red-600');
                this.cerrarDialogo();
            }
        }
    },
    watch: {
        mostrarEntregados(newVal) {
            this.pedidos_mostrar = newVal ? this.entregados : this.cancelados;
            this.paginaActual = 1;
        }
    },
    mounted() {
        this.obtenerPedidos();
    }
}
</script>

<style scoped>
.dialogo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.dialogo form {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
