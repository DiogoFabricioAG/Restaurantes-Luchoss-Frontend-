<template>
    <NavComponent/>
    <Complemento  mensaje="Administracion" cabezera="Lista de Pedidos"/> 
    <div class="w-full flex justify-center my-3">
        <label
            for="AcceptConditions"
            class="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-red-500 transition ease-in-out [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
        >
            <input
                type="checkbox"
                id="AcceptConditions"
                class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                v-model="mostrarEntregados"
            />
            <span
                class="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-red-600 transition-all peer-checked:start-6 peer-checked:text-green-600"
            >
                <WrongIcon data-unchecked-icon/>
                <CheckIcon class="hidden" data-checked-icon/>
            </span>
        </label>
    </div>
    
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

                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tipo Promocion</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Importe Total</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(pedido, index) in pedidosPaginados" :key="index" class="text-end">
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ pedido.ID_Pedido }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Comprobante }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.ID_Empleado }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Fecha_Registrada }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.Direccion }}</td>

                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ pedido.ID_Promocion }}</td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">S/{{ pedido.Total_pagar }}</td>
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
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import WrongIcon from '@/components/icons/WrongIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'
import SiguienteIcon from '@/components/icons/Siguiente.vue'
import AtrasIcon from '@/components/icons/Atras.vue'
import axios from 'axios'

export default {
    components:{
        NavComponent,
        Complemento,
        WrongIcon,
        CheckIcon,
        SiguienteIcon,
        AtrasIcon
    },
    setup(){
        const userStore = useUserStore()
        const toastStore = useToastStore()
        return{
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
            elementosPorPagina: 5
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
        async obtenerPedidos(){
            await axios.get('pedidos/cancelados')
            .then(response => {
                this.cancelados = response.data
            })
            .catch(error => {
                console.log(error);
            })
            await axios.get('pedidos/entregados')
            .then(response => {
                this.entregados = response.data
            })
            .catch(error => {
                console.log(error);
            })
            this.pedidos_mostrar = this.cancelados
        },
        cambiarPagina(nuevaPagina) {
            if (nuevaPagina > 0 && nuevaPagina <= this.totalPaginas) {
                this.paginaActual = nuevaPagina;
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
