<template>
    <NavComponent/>
    <section class="mt-5 text-center">
        <p class="font-Tenali text-3xl ">Gracias por confiar en</p>
        <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
        <p>Usted esta registrandose como <strong>{{ $route.query.role }}</strong></p>
    </section>
    <form method="post" enctype="multipart/form-data" class="text-sm my-4 rounded-2xl p-3 w-3/4 mx-auto text-center">
        <div class="space-y-2 flex flex-col items-center my-2 ">
            <label for="name">Nombre de Usuario</label>
            <input type="text" name="name" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
            <label for="email">Email</label>
            <input type="email" name="email" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
            <label for="passw">Contraseña</label>
            <input type="password" name="passw" class="border rounded-md w-1/2 p-1 border-gray-300 shadow-md ">
        </div>
            <button class="w-1/2 bg-blue-400 p-2 font-bold hover:bg-blue-500 duration-150 text-white">Registrar</button>
        
    </form>
</template>
<script>
import NavComponent from '@/components/NavBar.vue'


export default { 
    components:{
        NavComponent,

    }
}

</script>   