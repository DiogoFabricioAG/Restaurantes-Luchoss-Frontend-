<template>
    <NavComponent/>
    <Complemento mensaje="Buscando lo mejor para el Cliente" cabezera="Edicion de Platillos"/> 

    <div class="container mx-auto my-8">
        <h2 class="text-xl font-bold mb-4">Platillos</h2>
        <div  class="mb-2 grid grid-cols-4">
            <button v-for="(platillo, index) in platillos" :key="index" @click="abrirDialogo(platillo, platillo.ID_Producto)" class="bg-pink-500 m-2 text-white py-2 px-4 rounded duration-150 hover:bg-pink-600">
                Editar {{ platillo.Nombre }}
            </button>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Postres</h2>
        <div class="mb-2 grid grid-cols-4 ">
            <button v-for="(postre, index) in postres" :key="index" @click="abrirDialogo(postre, postre.ID_Producto)" class="bg-blue-500 m-2 text-white py-2 px-4 rounded duration-150 hover:bg-blue-600">
                Editar {{ postre.Nombre }}
            </button>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Bebidas</h2>
        <div class="mb-2 grid grid-cols-4">
            <button v-for="(bebida, index) in bebidas" :key="index" @click="abrirDialogo(bebida, bebida.ID_Producto)" class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 m-2">
                Editar {{ bebida.Nombre }}
            </button>
        </div>
    </div>
    <div v-if="mostrarDialogo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <form @submit.prevent="guardarCambios">
                <h2 class="text-2xl mb-4">Editar {{ prodSeleccionado }}</h2>
                <label for="nombre" class="block mb-2">Nombre:</label>
                <input type="text" v-model="formulario.Nombre" required class="w-full p-2 border rounded mb-4" />

                <label for="detalle" class="block mb-2">Detalle:</label>
                <textarea type="text" v-model="formulario.Detalle" required class="w-full p-2 resize-none border rounded mb-4" ></textarea>


                <label for="precioUnidad" class="block mb-2">Precio Unidad:</label>
                <input type="number" v-model="formulario.PrecioUnidad" required class="w-full p-2 border rounded mb-4" />

                <label for="urlImagen" class="block mb-2">URL Imagen:</label>
                <input type="text" v-model="formulario.ImagenURl" required class="w-full p-2 border rounded mb-4" />

                <div class="flex justify-end space-x-4">
                    <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                        Guardar
                    </button>
                    <button type="button" @click="cerrarDialogo" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'

export default {
    components: {
        NavComponent,
        Complemento
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
            platillos: [],
            bebidas: [],
            postres: [],
            codProducto: '',
            mostrarDialogo: false,
            prodSeleccionado: '',
            formulario: {
                ID_Tipo: '',
                Nombre: '',
                Detalle: '',
                PrecioUnidad: '',
                ImagenURl: ''
            }
        }
    },
    methods: {
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
        abrirDialogo(producto, cod) {
            this.codProducto = cod;
            this.prodSeleccionado = producto.Nombre
            this.formulario = { ...producto };
            this.mostrarDialogo = true;
        },
        cerrarDialogo() {
            this.mostrarDialogo = false;
            this.formulario = {
                ID_Tipo: '',
                Nombre: '',
                Detalle: '',
                PrecioUnidad: '',
                ImagenURl: ''
            };
        },
        async guardarCambios() {
            try {
                await axios.put(`actualizarmenu/${this.codProducto}`, {
                    idTipo: this.formulario.ID_Tipo,
                    nombre: this.formulario.Nombre,
                    detalle: this.formulario.Detalle,
                    precioUnidad: this.formulario.PrecioUnidad,
                    urlImagen:this.formulario.ImagenURl
                });
                this.cerrarDialogo();
                this.obtenerPlatillos();
                this.toastStore.showToast(3000, 'Producto actualizado exitosamente', "Check", 'bg-green-600')

            } catch (error) {
                console.error(error);
                this.toastStore.showToast(3000, "Ocurrio un error durante la operacion", "Wrong", 'bg-red-600')

            }
        }
    },
    mounted() {
        this.obtenerPlatillos();
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
