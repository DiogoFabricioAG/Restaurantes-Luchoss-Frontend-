<template>
    <div>
        <NavComponent/>
        <Complemento mensaje="Perseverancia" cabezera="Lista de Empleados"/> 
        
        <!-- Botón para abrir el formulario de agregar empleado -->
        <button @click="mostrarFormulario" class="p-2 rounded text-white font-bold flex items-center mx-auto space-x-1 hover:bg-green-400 duration-150 bg-green-500">
            <AgregarIcono/>
            <p>Añadir</p>
        </button> 

        <!-- Formulario de añadir empleado -->
        <div v-if="mostrarFormularioDialogo" class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full overflow-y-scroll h-3/4 max-w-md">
                <h2 class="text-2xl mb-4">Añadir Empleado</h2>
                <form @submit.prevent="guardarEmpleado">
                    <div class="mb-4">
                        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input type="text" v-model="formulario.nombre" id="nombre" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-4">
                        <label for="paterno" class="block text-sm font-medium text-gray-700">Apellido Paterno:</label>
                        <input type="text" v-model="formulario.paterno" id="paterno" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-4">
                        <label for="materno" class="block text-sm font-medium text-gray-700">Apellido Materno:</label>
                        <input type="text" v-model="formulario.materno" id="materno" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-4">
                        <label for="idSucursal" class="block text-sm font-medium text-gray-700">Sucursal:</label>
                        <select v-model="formulario.idSucursal" id="idSucursal" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm  bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="S00001">Sucursal 1</option>
                            <option value="S00002">Sucursal 2</option>
                            <option value="S00003">Sucursal 3</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono:</label>
                        <input type="text" v-model="formulario.telefono" id="telefono" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm  bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-4">
                        <label for="correo" class="block text-sm font-medium text-gray-700">Correo:</label>
                        <input type="email" v-model="formulario.correo" id="correo" required class="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm bg-slate-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="flex justify-end space-x-4">
                        <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Guardar</button>
                        <button type="button" @click="cerrarFormulario" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Diálogo de confirmación para despedir empleado -->
        <div v-if="mostrarDialogo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-2xl mb-4">¿Estás seguro?</h2>
                <p class="mb-4">¿Realmente quieres despedir a esta persona?</p>
                <div class="flex justify-end space-x-4">
                    <button @click="confirmarDespido" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                        Sí, despedir
                    </button>
                    <button @click="cerrarDialogo" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

        <!-- Lista de empleados (ejemplo) -->
        <section class="my-2 grid grid-cols-3">
            <div v-for="(index) in 5" :key="index" class="flex m-4 border-[2px] border-black rounded-xl items-center  gap-4">
                <button  @click="abrirDialogo" class="w-12 h-full">
                    <div class="group bg-red-600 w-12 justify-center rounded-l-lg border-[2px] border-black h-full flex items-center text-white">
                        <WrongIcon/>
                    </div>
                </button>
                <div>
                    <h3 class="text-lg/tight font-medium text-gray-900">Empleado {{ index +1 }}</h3>
                    <p class="mt-0.5 text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio
                        nesciunt quas non animi.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import AgregarIcono from '@/components/icons/AgregarIcono.vue'
import { useToastStore } from '@/stores/toast'
import WrongIcon from '@/components/icons/WrongIcon.vue'
import axios from 'axios'
export default {
    components: {
        NavComponent,
        Complemento,
        AgregarIcono,
        WrongIcon,
    },
    data() {
        return {
            formulario: {
                nombre: '',
                paterno: '',
                materno: '',
                idSucursal: '',
                telefono: '',
                correo: ''
            },
            mostrarFormularioDialogo: false,
            mostrarDialogo: false,
        };
    },
    methods: {
        mostrarFormulario() {
            this.mostrarFormularioDialogo = true;
        },

        cerrarFormulario() {
            this.mostrarFormularioDialogo = false;
        },

        async guardarEmpleado() {
            try {
                // Aquí se simula una solicitud para guardar el empleado
                await axios.post('actualizarrepartidor/contratar',{
                    idEmpleado: this.generarCodigo(),
                    nombre: this.formulario.nombre,
                    paterno: this.formulario.paterno,
                    materno: this.formulario.materno,
                    idSucursal: this.formulario.idSucursal,
                    telefono: this.formulario.telefono,
                    correo :this.formulario.correo
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
                
                this.toastStore.showToast(3000, 'Repartidor contratado exitosamente', "Check", 'bg-green-600')
                this.cerrarFormulario();
            } catch (error) {
                console.error('Error al guardar empleado:', error);
            }
        },

        abrirDialogo() {
            this.mostrarDialogo = true;
        },

        cerrarDialogo() {
            this.mostrarDialogo = false;
        },
        generarCodigo() {
            const prefix = 'RE';
            const randomDigits = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio entre 1000 y 9999
            return `${prefix}${randomDigits}`;
        },
        confirmarDespido() {
            console.log("Has despedido a esta persona");
            this.cerrarDialogo();
        }
    },
    setup() {
        const userStore = useUserStore();
        const toastStore = useToastStore();

        return {
            userStore,
            toastStore,
        };
    },
};
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
