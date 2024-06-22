<template>
    <NavComponent/>
    <section class="mt-5 text-center">
            <p class="font-Tenali text-3xl ">Ingresando a</p>
            <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
            <p class="font-bold">Iniciar Sesion</p>
    </section>
    
    <form action="." @submit.prevent="login" method="post" enctype="multipart/form-data" class="text-sm my-4 p-3  w-3/4 mx-auto text-center">
        <div class="space-y-2 flex flex-col items-center my-2 ">
            {{ userStore.user }}
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" class="border w-1/2 p-1 border-gray-300 shadow-md ">
            <label for="passw">Contraseña</label>
            <input type="password" name="passw" class="border w-1/2 p-1 border-gray-300 shadow-md ">
        </div>
            <button class="w-1/2 bg-black p-2 font-bold hover:bg-gray-950 duration-150 text-white">Iniciar Sesion</button>
    </form>
    <p class="text-center">¿No tienes una cuenta? <router-link :to="{name:'option'}" class="underline font-bold duration-150 hover:shadow-md" href="#">Registrate aqui</router-link></p>
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'

export default { 
    setup() {
        const userStore = useUserStore()
        return{
            userStore,
        }
    },
    components:{
        NavComponent,

    },
    data() {
        return {
            email :'',

        }
    },
    methods: {
        login(){
            this.userStore.user.email = this.email
            console.log("tendria que cambiar");
        }
    },
    
}

</script>   