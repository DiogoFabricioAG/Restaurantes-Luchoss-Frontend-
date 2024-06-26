<template>
    <NavComponent/>

    <Complemento cabezera="Ingresando a" mensaje="🧡"/>
    <form action="." @submit.prevent="login" method="post" enctype="multipart/form-data" class="text-sm my-4 p-3  w-3/4 mx-auto text-center">
        <div class="space-y-2 flex flex-col items-center my-2 ">
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" class="border w-1/2 p-1 border-gray-300 shadow-md ">
            <label for="passw">Contraseña</label>
            <input type="password" v-model="clave" name="passw" class="border w-1/2 p-1 border-gray-300 shadow-md ">
        </div>
            
            <button class="w-1/2 bg-black p-2 font-bold hover:bg-gray-950 duration-150 text-white">Iniciar Sesion</button>
            <div v-if="mensaje_error" class="text-white select-none justify-center py-2 w-1/2 mx-auto rounded-md bg-red-500 text-sm my-2 font-Alata">
                <p>{{ mensaje_error }}</p>
            </div>
    </form>
    <p class="text-center">¿No tienes una cuenta? <router-link :to="{name:'option'}" class="underline font-bold duration-150 hover:shadow-md" href="#">Registrate aqui</router-link></p>
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
export default { 
    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()
        return{
            userStore,
            toastStore
        }
    },
    components:{
        NavComponent,
        Complemento,
    },
    data() {
        return {
            email :'',
            clave: '',
        }
    },
    methods: {
        async login(){
            if (this.email === '' || this.clave === ''){
                const mensaje_error = 'Debes completar cada uno de las casillas'
                this.toastStore.showToast(3000, mensaje_error, "Wrong", 'bg-red-600')
                return 'Error'
            }
            else{
                if (this.$route.query.role === 'Cliente'){
                    await axios.post('/cuenta/cliente',{
                        correo: this.email,
                        clave: this.clave
                    })
                    .then(response => {
                        console.log(response.data);
                        this.userStore.login({
                            email: response.data.Correo,
                            last_name : response.data.Nombre,
                            first_name : response.data.Paterno + ' ' + response.data.Materno,
                            role : 'Cliente',
                            id_cliente : response.data.ID_Cliente,
                            id_cuenta : response.data.ID_Cuenta,
                            direccion: response.data.Direccion

                        })
                        this.toastStore.showToast(3000, "Sesion Iniciada", "Check", 'bg-green-600')
                        this.$router.push({name:'home'})  
                    })
                    .catch(status => {
                        this.toastStore.showToast(3000, status.response.data.error, "Wrong", 'bg-red-600')
                    })
                }
                else {
                    await axios.post('/cuenta/admin',{
                        correo: this.email,
                        clave: this.clave
                    })
                    .then(response => {

                        this.userStore.login({
                            email: response.data.Correo,
                            last_name : response.data.Nombre,
                            first_name : response.data.Paterno + ' ' + response.data.Materno,
                            role : 'Admin'

                        })
                        this.toastStore.showToast(3000, "Sesion Inciada, Admin 🛐", "Check", 'bg-green-600')
                        this.$router.push({name:'home'})
                    })
                    .catch(status => {
                        this.toastStore.showToast(3000, status.response.data.error, "Wrong", 'bg-red-600')
                    })
                }
                
            }
            

        }
    },
    
}

</script>   