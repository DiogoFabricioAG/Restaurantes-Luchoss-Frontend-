<template>
    <NavComponent/>
    <main>
        <section class="font-Tenali m-3">
            <h1 class="text-5xl font-bold">Mi Carrito</h1>
            <div class="flex w-full">
                <div class="w-3/5">
                    <table class="min-w-full bg-white">
            <thead class="bg-gray-200 text-gray-600">
                <tr>
                    <th class="w-1/2 py-3 px-4 uppercase font-semibold text-sm">Producto</th>
                    <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Cantidad</th>
                    <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Precio</th>
                    <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Borrar?</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                <tr>
                    <td class="w-1/2 py-3 px-4">
                        <div class="flex items-center">
                            <img class="w-40 object-cover mr-4" src="https://www.comedera.com/wp-content/uploads/2022/05/Arroz-con-pato-peruano-shutterstock_1846729603.jpg" alt="Imagen del producto">
                            <div>
                                <div class="font-bold text-2xl">Arroz con Pato</div>
                                <div class="text-gray-500 text-sm">Arroz sazonado con pato tierno, cilantro, y cerveza negra</div>
                            </div>
                        </div>
                    </td>
                    <td class="w-1/6 py-3 px-4 text-xl text-center">1</td>
                    <td class="w-1/6 py-3 px-4 text-2xl text-right">S/ 15.50</td>
                    <td class="w-1/6 py-3 px-4 text-right">
                        <button><borrar/></button>
                    </td>
                </tr>
            </tbody>
        </table>
                </div>  
                <div class="w-2/5">

                </div>
            </div>
        </section>
    </main>

</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import borrar from '@/components/icons/BorrarIcono.vue'

export default { 
    components:{
        NavComponent,
        borrar,

    }
}

</script>   