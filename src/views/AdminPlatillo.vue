<template>
    <NavComponent/>
    <Complemento  mensaje="Que desea hacer hoy?" cabezera="Zona de Platillos"/> 
    <section class="w-3/4 mx-auto my-3">
        
        <div class="flex justify-center mt-3">
            <router-link :to="{name:'adminplatilloscreacion'}" class="bg-green-500 p-5 text-center text-white mx-3 hover:scale-90 duration-100">
                <CreacionIcono class=" size-52"/>
                <span class="font-Lato text-4xl font-bold">Crear</span>
            </router-link>
            <router-link :to="{name:'adminplatillosedicion'}" class="bg-gray-500 hover:scale-90 duration-100 text-center text-white p-5 mx-3 ">
                <EditarIcono class="text-center size-52"/>
                <span class="font-Lato text-4xl font-bold">Editar</span>
            </router-link>
            
        </div>
    </section>    
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'
import EditarIcono from '@/components/icons/EditarIcono.vue'
import CreacionIcono from '@/components/icons/CreacionIcono.vue'
export default {
    components:{
        NavComponent,
        Complemento,
        EditarIcono,
        CreacionIcono,
    },
    setup(){
        const userStore = useUserStore()
        const toastStore = useToastStore()
        return{
            userStore,
            toastStore
        }
    }
}

</script>
