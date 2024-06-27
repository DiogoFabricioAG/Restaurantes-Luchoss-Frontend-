<template>
    <NavComponent/>

    <Complemento cabezera="Gracias por confiar en nosotros" mensaje="La comida une a las personas en todos los rincones del mundo"/>
    <span class="flex space-x-2 items-center justify-center">
        <button @click="irAtras" class="p-1 border hover:bg-slate-300 duration-150 border-black rounded-lg"><AtrasIcon class="size-4"/></button>
        <p class="text-sm font-Lato select-none">{{ datos }}</p>
        <button @click="irAdelante" class="p-1 border hover:bg-slate-300 duration-150 border-black rounded-lg"><SiguienteIcon class="size-4"/></button>
    </span>
    <form action="." @submit.prevent="register" method="post" enctype="multipart/form-data" class="text-sm my-4 rounded-2xl p-3 w-3/4 mx-auto text-center">
        <div v-if="pagina" class="space-y-2 flex flex-col items-center ">
            
            <label for="name">Nombre de Usuario</label>
            <input type="text" v-model="nombreusuario" name="name" placeholder="Ingrese su nombre de usuario" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            <label for="email">Email</label>
            <input type="email" v-model="correo" name="email" placeholder="Ingrese su email" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            <label for="distrito">Distrito</label>
            <input type="text" v-model="distrito" name="distrito" placeholder="Ingrese su distrito" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
            
            <label for="direccion">Dirección</label>
            <input type="text" v-model="direccion" name="direccion" placeholder="Ingrese su dirección" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            <label for="passw">Contraseña</label>
            <input type="password" v-model="clave" name="passw" placeholder="Ingrese su contraseña" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
        </div>
        <div v-else class="space-y-3 flex flex-col items-center ">
            <label for="nombre">Nombre</label>
            <input type="text" v-model="nombre" name="nombre" placeholder="Ingrese su nombre" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
            <div class="flex space-x-2 items-center w-1/2">
                
                <label for="paterno">Paterno</label>
                <input type="text" v-model="paterno" name="paterno" placeholder="Ingrese su apellido paterno" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

                <label for="materno">Materno</label>
                <input type="text" v-model="materno" name="materno" placeholder="Ingrese su apellido materno" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            </div>
            
            <label for="telefono">Telefono</label>
            <input type="text" v-model="telefono" name="telefono" placeholder="Ingrese su teléfono" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            
            <label for="ruc">RUC</label>
            <input type="text" v-model="ruc" name="ruc" placeholder="Ingrese su RUC" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
            <div class="flex space-x-2 items-center">
                <label for="tipo-documento">Tipo de Documento</label>
                <select v-model="tipoDoc" name="tipo-documento" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
                    <option value="DNI">DNI</option>
                    <option value="Carnet de extranjeria">Carnet de Extranjería</option>
                </select>

            <label for="documento">Documento</label>
            <input type="text" v-model="documento" name="documento" placeholder="Ingrese su documento" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">

            </div>
            


        </div>
        
            <button class="w-1/2 my-3 bg-blue-400 p-2 font-bold hover:bg-blue-500 duration-150 text-white">Registrar</button>
            <div v-if="mensaje_error" class="text-white select-none justify-center py-2 w-1/2 mx-auto rounded-md bg-red-500 text-sm my-2 font-Alata">
                <p>{{ mensaje_error }}</p>
            </div>
        
    </form>
    
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import Complemento from '@/components/Complemento.vue'
import axios from 'axios'
import SiguienteIcon from '@/components/icons/Siguiente.vue'
import AtrasIcon from '@/components/icons/Atras.vue'
import { useToastStore } from '@/stores/toast'

export default { 
    setup() {
        const toastStore = useToastStore()
        return{
            toastStore
        }
    },
    
    components:{
        NavComponent,
        Complemento,
        SiguienteIcon,
        AtrasIcon,
    },
    data() {
        return {
            nombreusuario: '',
            clave: '',
            correo: '',
            distrito:'',
            mensaje_error: '',
            pagina: 1,
            datos : 'Cuenta',
            nombre : '',
            paterno: '',
            materno: '',
            telefono: '',
            direccion: '',
            ruc: '',
            tipoDoc: '',
            cuentas : [],
            documento: ''
        }
    },
    methods: {
        irAdelante(){
            this.pagina = 0
            this.datos = "Cliente"
        },
        irAtras(){
            this.pagina = 1
            this.datos = 'Cuenta'
        },
        
        async register(){
            if (
                this.nombreusuario === '' || 
                this.clave === '' || 
                this.correo === '' || 
                this.distrito === '' || 
                this.nombre === '' || 
                this.paterno === '' || 
                this.materno === '' || 
                this.telefono === '' || 
                this.direccion === '' || 
                this.ruc === '' || 
                this.tipoDoc === '' || 
                this.documento === ''
            ) {
                const mensaje_error = 'Debes completar cada uno de las casillas';
                this.toastStore.showToast(3000, mensaje_error, "Wrong", 'bg-red-600')

                return 'Error';
            }
            if (this.clave.length < 5 ){
                const mensaje_error = "Tu clave es muy corta, intenta con una mayor a 8 digitos "
                this.toastStore.showToast(3000, mensaje_error, "Wrong", 'bg-red-600')
                return 'Error';
            }
            else {
                await axios.post('/registro/nuevaCuenta', {
                correo: this.correo,
                clave: this.clave,
                usuario: this.nombreusuario,
                distrito: this.distrito
                })
                .then(response => {
                    if (response.data !== "La cuenta de Pedrin no ha sido agregada, es posible que el usuario ya esté registrado"){
                        console.log('Cuenta Creada con exito');          
                    }
                    else{
                        this.mensaje_error = response.data
                    }
                    
                })
                .catch(error => {
                    return error;
                })
                await axios.get('registro/cuenta')
                .then(response => {
                    this.cuentas = response.data
                })
                .catch(error => {
                    return error
                })
                const cuenta = this.cuentas.filter(cuenta => cuenta.Correo === this.correo) 
                await axios.post('/registro/nuevoCliente' , {
                    idCuenta: cuenta[0].ID_Cuenta,
                    nombre: this.nombre,
                    paterno: this.paterno,
                    materno: this.materno,
                    telefono: this.telefono,
                    distrito: this.distrito,
                    direccion: this.direccion,
                    ruc: this.ruc,
                    tipoDoc: this.tipoDoc,
                    documento: this.documento
                })
                .then(response => {
                    this.toastStore.showToast(3000, response.data, "Check", 'bg-green-600')
                    this.$router.push({name: 'login', query:{role : 'Cliente'}})
                })
                .catch(error => {
                    console.log(error);
                })
            } 
        }
    },
}

</script>   