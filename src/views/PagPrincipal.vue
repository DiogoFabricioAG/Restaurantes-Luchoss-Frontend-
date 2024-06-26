<template>
    <NavComponent/>
    <main>
        <Complemento mensaje="Tu mejor elección" cabezera="Comida directamente hacia tu casa"/>
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
import Complemento from '@/components/Complemento.vue'
export default {
    components:{
        NavComponent,
        Complemento,
    }
}

</script>   