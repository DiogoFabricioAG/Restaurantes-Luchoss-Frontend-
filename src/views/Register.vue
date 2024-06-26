<!-- Como se cambiara el nombre -->
<template>
    <NavComponent/>

    <Complemento mensaje="⭐" cabezera="Gracias por confiar"/>
    <section class="w-3/4 mx-auto my-3">
        
        <div class="flex justify-center mt-3">
            <router-link :to="{name:'login', query:{role : 'Admin'}}" class="bg-red-500 hover:scale-90 duration-100 text-center text-white p-5 mx-3 ">
                <ChefIcono class="text-center size-52"/>
                <span class="font-Lato text-4xl font-bold">Admin</span>
            </router-link>
            <router-link :to="{name:'login', query:{role : 'Cliente'}}" class="bg-blue-500 p-5 text-center text-white mx-3 hover:scale-90 duration-100">
                <UserIcon class=" size-52"/>
                <span class="font-Lato text-4xl font-bold">Cliente</span>
            </router-link>
        </div>
    </section>        
    
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import ChefIcono from '@/components/icons/ChefIcono.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import Complemento from '@/components/Complemento.vue'

export default { 
    components:{
        NavComponent,
        ChefIcono,
        UserIcon,
        Complemento,
    }
}

</script>   