<template>
    <div class="w-full py-4 bg-orange-300  shadow-lg justify-between flex px-4">
        <router-link :to="{name:'home'}" class="space-y-0 flex items-center">
            <BadgeIcon class="size-12"/>
            <div><span class="font-Holtwood text-xs">Restaurante</span>
                <h1 class="font-Holtwood text-xl">Luchitoss</h1></div>
            
        </router-link>
        <div v-if="userStore.user.isAuthenticated" class="flex space-x-3 text-white items-center">
            <p class="text-black font-Tenali text-2xl">¡Bienvenido <strong class="font-Lato text-base">{{ userStore.user.first_name }}</strong>!</p>
            <router-link v-if="userStore.user.role === 'Cliente'" :to="{name:'sucursales'}" class="rounded-full group bg-fuchsia-700 p-3  border-black hover:bg-fuchsia-500 duration-150 border ">
                <span><SucursalesIcono/></span>
            </router-link>
            <router-link v-if="userStore.user.role === 'Cliente'" :to="{name:'pedidos'}" class="rounded-full group bg-gray-700 p-3  border-black hover:bg-gray-500 duration-150 border ">
                <span><ConsultarIcono/></span>
            </router-link>
            <router-link v-if="userStore.user.role === 'Cliente'" :to="{name: 'platillos'}" class="rounded-full bg-green-700 p-3 group border-black hover:bg-green-500 duration-150 border ">
                <span><TiendaIcono/></span>
            </router-link>
            <router-link :to="{name: 'empleados'}" v-if="userStore.user.role === 'Admin'" class="rounded-full bg-violet-700 p-3 group border-black hover:bg-violet-500 duration-150 border ">
                <span><ChefIcon/></span>
            </router-link>
            <router-link :to="{name:'adminpedidos'}" v-if="userStore.user.role === 'Admin'" class="rounded-full group bg-yellow-700 p-3  border-black hover:bg-yellow-500 duration-150 border ">
                <span><DineroIcono/></span>
            </router-link>
            <router-link :to="{name:'pedidosabiertos'}" v-if="userStore.user.role === 'Admin'" class="rounded-full group bg-cyan-700 p-3  border-black hover:bg-cyan-500 duration-150 border ">
                <span><PedidosIcono/></span>
            </router-link>
            <router-link v-if="userStore.user.role === 'Admin'" :to="{name:'adminplatillos'}" class="rounded-full bg-pink-700 p-3 group border-black hover:bg-pink-500 duration-150 border ">
                <span><PolloIcono/></span>
            </router-link>
            
            <!-- <Botones iconComponent="ChefIcon" tooltip-text="Descripción del ícono"/> -->
            

            <button @click="logout" class="bg-red-800  border flex items-center space-x-2 rounded-full border-black p-3  hover:bg-red-600 duration-100 font-Lato" href="#">
                <span><Logout/></span>
            </button>
            
            
        </div>
        <div v-else class="flex space-x-3 items-center text-white">
            <router-link :to="{name:'option'}" class="bg-blue-800  border flex items-center space-x-2 border-black p-3 rounded-full text-lg hover:bg-blue-600 duration-100 font-Lato">
                <span><LoginIcon/></span>
                
            </router-link>
            <router-link :to="{name:'register'}" class="bg-yellow-800 border flex items-center space-x-2 border-black p-3 rounded-full text-lg hover:bg-yellow-600 duration-100 font-Lato">
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
import TiendaIcono from '@/components/icons/TiendaIcono.vue'
import DineroIcono from '@/components/icons/DineroIcono.vue'
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
        DineroIcono,
        TiendaIcono,
        Logout,
        ChefIcon,
        BadgeIcon,
        SucursalesIcono,
        PedidosIcono,
        PolloIcono,
        ConsultarIcono,
        Carro,
    },
    methods: {
        logout(){
            this.userStore.logout()
            this.$router.push({name:'home'})
        }
    },
}
</script>