<template>
    <NavComponent/>
    <Complemento cabezera="Elaboracion de Platillos" mensaje="Los mejores platillos para nuestros clientes"/>
    <section class="">
    <div class="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

            <div class="lg:col-span-2 lg:py-12 space-y-2">
                <h2 class="text-5xl font-bold font-Tenali select-none text-pink-600"> Imagen Comercial </h2>

                <img v-if="urlimg" class="border-[3px] border-black rounded-lg" :src="urlimg" alt="nose">

            <div class="mt-8">
            </div>
        </div>

        <div class="rounded-lg border-[2px] border-black bg-white p-8 shadow-2xl lg:col-span-3 lg:p-12">
            <form action="." @submit.prevent="crearPlatillo" class="space-y-4">
            <div>
                <label class="sr-only" for="name">url</label>
                <input
                v-model="urlimg"
                class="w-full rounded-lg bg-slate-100 border-gray-200 p-3 text-sm"
                placeholder="URL de la Imagen"
                type="text"
                id="name"
                />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                <label class="sr-only" for="Nombre">Nombre</label>
                <input
                    v-model="nombre"
                    class="w-full rounded-lg bg-slate-100 border-gray-200 p-3 text-sm"
                    placeholder="Nombre del Producto"
                    type="Nombre"
                    id="Nombre"
                />
                </div>

                <div>
                <label class="sr-only" for="Precio del Producto">Precio</label>
                <input
                    v-model="precio"
                    class="w-full rounded-lg bg-slate-100 border-gray-200 p-3 text-sm"
                    placeholder="Precio del Producto"
                    type="number"
                    id="Precio del Producto"
                />
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                <label
                    for="Option1"
                    class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-pink-500 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500 has-[:checked]:text-white"
                    tabindex="0"
                >
                    <input v-model="tipo" class="sr-only bg-slate-100" id="Option1" type="radio" value="1" tabindex="-1" name="option" />

                    <span class="text-sm font-bold"> Platillo Principal </span>
                </label>
                </div>

                <div>
                <label
                    for="Option2"
                    class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                    tabindex="0"
                >
                    <input v-model="tipo" class="sr-only bg-slate-100" id="Option2" type="radio" value="2" tabindex="-1" name="option" />

                    <span class="text-sm font-bold">Postre</span>
                </label>
                </div>

                <div>
                <label
                    for="Option3"
                    class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-yellow-500 has-[:checked]:border-yellow-500 has-[:checked]:bg-yellow-500 has-[:checked]:text-white"
                    tabindex="0"
                >
                    <input v-model="tipo" class="sr-only bg-slate-100" id="Option3" type="radio" value="3" tabindex="-1" name="option" />

                    <span class="text-sm font-bold"> Bebida </span>
                </label>
                </div>
            </div>


            <div>
                <label class="sr-only" for="descripcion">descripcion</label>

                <textarea
                v-model="detalle"
                class="w-full rounded-lg bg-slate-100 border-gray-200 p-3 text-sm"
                placeholder="Descripcion del producto"
                rows="8"
                id="descripcion"
                ></textarea>
            </div>

            <div class="mt-4">
                <button
                type="submit"
                class="inline-block w-full active:scale-105 duration-150 rounded-lg bg-pink-600 px-5 py-3 font-medium text-white sm:w-auto"
                >
                Crear Platillo
            </button>
            </div>
            </form>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
export default{
    components:{
        NavComponent,
        Complemento
    },
    setup() {
        const toastStore = useToastStore()  
        return{
            toastStore
        }
    },
    data() {
        return {
            urlimg: '',
            nombre:'',
            detalle:'',
            precio: 0,
            tipo : 0
        }
    },
    methods: {
        generarCodigo(){
            const prefijo = "PR";
            const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
            const codigo = prefijo + numeroAleatorio.toString();
            return codigo;
        },
        async crearPlatillo(){
            if (this.nombre === '' || this.detalle === '' || this.precio === 0 || this.tipo === 0 || this.urlimg === ''){
                const mensaje_error = 'Debes completar cada uno de las casillas ' + this.tipo
                this.toastStore.showToast(3000, mensaje_error, "Wrong", 'bg-red-600')
                return 'error'
            }
            else{
                await axios.post('actualizarmenu/agregar',{
                    idProducto: this.generarCodigo(),
                    "idTipo": this.tipo,
                    "nombre": this.nombre,
                    "detalle": this.detalle,
                    "precioUnidad": this.precio,
                    "urlImagen" : this.urlimg
                })
                .then(response => {
                    console.log(response.data);
                    this.toastStore.showToast(3000, "Creacion exitosa", "Check", 'bg-green-600')
                    this.$router.push({name:'home'})
                })
                .catch(error => {
                    console.log(error);
                    this.toastStore.showToast(3000, "Ocurrio un error inesperado", "Check", 'bg-green-600')
                })
            }
        }
    },
    
}
</script>