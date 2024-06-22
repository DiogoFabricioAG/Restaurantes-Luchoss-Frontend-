<template>
    <NavComponent/>
    <section class="w-3/4 font-Alata mx-auto text-center my-2 space-y-2">
        <p class="font-Tenali text-3xl ">Las sucursales de</p>
        <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
        <div class="w-full space-x-2 space-y-2 flex flex-wrap justify-center">
           
            <div class="border rounded-xl text-left p-2 w-2/5">
                <h3 class="text-2xl">San Isidro</h3>
                <p class="text-xs"><strong>Direccion: </strong>Av. Javier Prado Este 1234</p>
                <p class="text-sm text-gray-700"><strong>Telefono: </strong>987654321</p>
                <p><strong>Administrador: </strong>Carlos Pérez</p>
            </div>
            <div class="border rounded-xl text-left p-2 w-2/5">
                <h3 class="text-2xl">San Isidro</h3>
                <p class="text-xs"><strong>Direccion: </strong>Av. Javier Prado Este 1234</p>
                <p class="text-sm text-gray-700"><strong>Telefono: </strong>987654321</p>
                <p><strong>Administrador: </strong>Carlos Pérez</p>
            </div>
            
            <div class="border rounded-xl text-left p-2 w-2/5">
                <h3 class="text-2xl">San Isidro</h3>
                <p class="text-xs"><strong>Direccion: </strong>Av. Javier Prado Este 1234</p>
                <p class="text-sm text-gray-700"><strong>Telefono: </strong>987654321</p>
                <p><strong>Administrador: </strong>Carlos Pérez</p>
            </div>
            <div class="border rounded-xl text-left p-2 w-2/5">
                <h3 class="text-2xl">San Isidro</h3>
                <p class="text-xs"><strong>Direccion: </strong>Av. Javier Prado Este 1234</p>
                <p class="text-sm text-gray-700"><strong>Telefono: </strong>987654321</p>
                <p><strong>Administrador: </strong>Carlos Pérez</p>
            </div>
        </div>
    </section>
</template>

<script>
import NavComponent from '@/components/NavBar.vue'

export default { 
    components:{
        NavComponent,
    }
}

</script>   