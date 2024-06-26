<template>
    <NavComponent/>
    <Complemento cabezera="Las sucursales de" mensaje="Más cerca de ti"/>
        <div class="w-full space-y-2 mx-auto">
        
           <div v-for="(sucur, index) in sucursal" :key="index" class="border px-3 border-black mx-auto flex items-center justify-between text-white rounded-xl text-left p-2 w-2/5 bg-gradient-to-r from-violet-500 to-fuchsia-500">   
               <div class="w-3/4">
                <h3 class="text-2xl">{{ sucur.Distrito }}</h3>
               <p class="text-xs"><strong>Direccion: </strong>{{sucur.Direccion  }}</p>
               <p class="text-sm text-yellow-400"><strong>Ruc: </strong>{{ sucur.Ruc }}</p>
               <p><strong>Administrador: </strong>{{ sucur.Administrador }}</p>
               </div>
               <div>
                <span class="font-Holtwood text-5xl">{{ index }}</span>
               </div>
               
           </div>
       </div>
    
</template>

<script>
import NavComponent from '@/components/NavBar.vue'
import axios from 'axios'
import Complemento from '@/components/Complemento.vue'

export default { 
    components:{
        NavComponent,
        Complemento,
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