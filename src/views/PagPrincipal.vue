<template>
    <NavComponent/>
    <main>
        <section class="my-5 text-center">
            <p class="font-Tenali text-3xl ">Comida directamente hacia tu casa</p>
            <h1 class="font-Tenali text-7xl select-none font-bold ">Restaurante Luchitoss</h1>
        </section>
        <section class="flex">
            <div class="px-3 mx-2 w-2/5">
                <img  src="https://ingenieriademenu.com/wp-content/uploads/2021/07/Descripcion-de-puestos-de-trabajo-en-hosteleria.jpg" alt="Elequipo">
            </div>
            <div class="w-3/5 text-xl font-Niconne mx-3 flex-col">
                <div>
                    <p class="font-bold text-3xl">¡Hola! Soy Luis, el dueño de Luchoss. ¡Bienvenido!</p>
                    <p>En Luchoss, combinamos sabores tradicionales con un toque moderno. Disfruta de nuestros platos elaborados con ingredientes frescos y de alta calidad. No te pierdas el "Lomo Luchoss", nuestra especialidad. Nuestro equipo se dedica a ofrecerte un servicio excepcional para que cada visita sea memorable.</p>
                    
                </div>
                <p>Saborea la excelencia.</p>
                <p class="text-end">¡Te esperamos!</p>
            </div>


        </section>
    </main>     

        
</template>
<script>
import NavComponent from '@/components/NavBar.vue'
export default {
    components:{
        NavComponent,
    }
}

</script>   