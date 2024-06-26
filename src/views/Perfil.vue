<template>
    <NavComponent/>
    <Complemento  mensaje="Mensaje de prueba" cabezera="Otro mensaje de Prueba"/> 
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import { useUserStore } from '../stores/user'
import Complemento from '@/components/Complemento.vue'
import { useToastStore } from '@/stores/toast'

export default {
    components:{
        NavComponent,
        Complemento
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
