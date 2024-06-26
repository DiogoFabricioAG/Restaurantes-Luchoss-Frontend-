<template>
    <div class="w-full py-4 bg-orange-300  shadow-lg justify-between flex px-4">
        <router-link :to="{name:'home'}" class="space-y-0 flex items-center">
            <BadgeIcon class="size-12"/>
            <div><span class="font-Holtwood text-xs">Restaurante</span>
                <h1 class="font-Holtwood text-xl">Luchitoss</h1></div>
            
        </router-link>
        <div v-if="userStore.user.isAuthenticated" class="flex space-x-3 text-white items-center">
            <p class="text-black font-Tenali text-2xl">¡Bienvenido <strong class="font-Lato">{{ userStore.user.first_name }}</strong>!</p>
            <router-link :to="{name:'sucursales'}" class="rounded-full bg-fuchsia-700 p-3  border-black hover:bg-fuchsia-500 duration-150 border ">
                <span><SucursalesIcono/></span>
            </router-link>
            <router-link :to="{name:'pedidos'}" class="rounded-full bg-gray-700 p-3  border-black hover:bg-gray-500 duration-150 border ">
                <span><ConsultarIcono/></span>
            </router-link>
            <a href="#" class="rounded-full bg-violet-700 p-3  border-black hover:bg-violet-500 duration-150 border ">
                <span><ChefIcon/></span>
            </a>
            <a href="#" class="rounded-full bg-cyan-700 p-3  border-black hover:bg-cyan-500 duration-150 border ">
                <span><PedidosIcono/></span>
            </a>
            <a href="#" class="rounded-full bg-pink-700 p-3  border-black hover:bg-pink-500 duration-150 border ">
                <span><PolloIcono/></span>
            </a>
            
            <Botones iconComponent="ChefIcon" tooltip-text="Descripción del ícono"/>
            
            <router-link :to="{name:'carrito'}" class="rounded-full bg-green-700 p-3  border-black hover:bg-green-500 duration-150 border ">
                <span><Carro/></span>
            </router-link>
            <button @click="userStore.logout" class="bg-red-800  border flex items-center space-x-2 rounded-full border-black p-3  hover:bg-red-600 duration-100 font-Lato" href="#">
                <span><Logout/></span>
            </button>
           
            
        </div>
        <div v-else class="flex space-x-3 items-center text-white">
            <router-link :to="{name:'login'}" class="bg-blue-800  border flex items-center space-x-2 border-black p-3 rounded-full text-lg hover:bg-blue-600 duration-100 font-Lato" href="#">
                <span><LoginIcon/></span>
                
            </router-link>
            <router-link :to="{name:'option'}" class="bg-yellow-800 border flex items-center space-x-2 border-black p-3 rounded-full text-lg hover:bg-yellow-600 duration-100 font-Lato" href="#">
                <span><RegisterIcon/></span>
            </router-link>
        </div>

    </div>
        
</template>

<script>
import LoginIcon from '@/components/icons/LoginIcon.vue'
import RegisterIcon from '@/components/icons/RegisterIcon.vue'
import BadgeIcon from '@/components/icons/BadgeIcon.vue'
import Botones from '@/components/Botones.vue'
import ChefIcon from '@/components/icons/ChefIcon.vue'
import Logout from '@/components/icons/Logout.vue'
import PolloIcono from '@/components/icons/PolloIcono.vue'
import PedidosIcono from '@/components/icons/PedidosIcono.vue'
import Carro from '@/components/icons/CarritoComprasIcono.vue'
import ConsultarIcono from '@/components/icons/ConsultarIcono.vue'
import SucursalesIcono from '@/components/icons/SucursalesIcono.vue'
import { useUserStore } from '../stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        return{
            userStore,
        }
    },
    components: {
        LoginIcon,
        Botones,
        RegisterIcon,
        Logout,
        ChefIcon,
        BadgeIcon,
        SucursalesIcono,
        PedidosIcono,
        PolloIcono,
        ConsultarIcono,
        Carro,
    }
}
</script>