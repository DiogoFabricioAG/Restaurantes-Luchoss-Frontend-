<template>
    <NavComponent/>
        
    
</template>
<script>
import axios from 'axios'

import NavComponent from '@/components/NavBar.vue'

export default {
    components:{
        NavComponent,
    },
    data() {
        return {
            platillos: [],
        }
    },
    mounted() {
        this.getPlates()
    },
    methods: {
        async getPlates(){
            await axios.get('registro/cuenta')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
}
</script>