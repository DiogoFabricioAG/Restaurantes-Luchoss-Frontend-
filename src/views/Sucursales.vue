<template>
    <NavComponent/>
    <section class="w-3/4 font-Alata mx-auto text-center my-2 space-y-2">
        <p class="font-Tenali text-3xl ">Las sucursales de</p>
        <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
        <div class="w-full space-x-2 space-y-2 flex flex-wrap justify-center">
           
            <div v-for="(sucur, index) in sucursal" :key="index" class="border rounded-xl text-left p-2 w-2/5">
                <h3 class="text-2xl">{{ sucur.Distrito }}</h3>
                <p class="text-xs"><strong>Direccion: </strong>{{sucur.Direccion  }}</p>
                <p class="text-sm text-gray-700"><strong>Ruc: </strong>{{ sucur.Ruc }}</p>
                <p><strong>Administrador: </strong>{{ sucur.Administrador
 }}</p>
            </div>
        </div>
    </section>
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import axios from 'axios'
export default { 
    components:{
        NavComponent,
    },
    data() {
        return {
            sucursal: [],
        }
    },
    mounted() {
        this.leerDatos()
    },
    methods: {
        async leerDatos(){
            await axios.get('sucursal/mostrar')
            .then(response => {
                this.sucursal = response.data
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
}

</script>   