<template>
    <NavComponent/>

    <div class=" font-Alata mx-3 my-4 flex  text-center">
        <div class="relative overflow-x-auto my-2 w-3/5 border-r border-gray-300 justify-center">
            <p class="text-3xl my-1">Lista de Pedidos</p>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre del Pedido
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total (S/)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Estado 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Operaciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Pedido 1
                        </th>
                        <td class="px-6 py-4">
                            23.35
                        </td>
                        <td class="px-6 py-4">
                            Entregado
                        </td>
                        <td class="px-6 py-4  space-x-1 flex text-white justify-end">
                            <button class="p-2 rounded-full bg-blue-600 hover:scale-105 duration-150"><InformacionIcono/></button>
                            <button class="p-2 rounded-full bg-red-600 hover:scale-105 duration-150"><XIcono/></button>
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Pedido 2
                        </th>
                        <td class="px-6 py-4">
                            23.35
                        </td>
                        <td class="px-6 py-4">
                            Entregado
                        </td>
                        <td class="px-6 py-4  space-x-1 flex text-white justify-end">
                            <button class="p-2 rounded-full bg-blue-600 hover:scale-105 duration-150"><InformacionIcono/></button>
                            <button class="p-2 rounded-full bg-red-600 hover:scale-105 duration-150"><XIcono/></button>
                        </td>
                    </tr>
                    <tr class="bg-white ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Pedido 3
                        </th>
                        <td class="px-6 py-4">
                            23.35
                        </td>
                        <td class="px-6 py-4">
                            Entregado
                        </td>
                        <td class="px-6 py-4  space-x-1  flex justify-end text-white ">
                            <button class="p-2 rounded-full bg-blue-600 hover:scale-105 duration-150"><InformacionIcono/></button>
                            <button class="p-2 rounded-full bg-red-600 hover:scale-105 duration-150"><XIcono/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-2/5 text-center">
            <p class="text-3xl my-1">Detalle del Pedido</p>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre del Producto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tipo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Cantidad 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Precio por ud. (S/)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            ARROZ CON PATO
                        </th>
                        <td class="px-6 py-4">
                            Principal
                        </td>
                        <td class="px-6 py-4">
                            2
                        </td>
                        <td class="px-6 py-4">
                            15.50
                        </td>
                    </tr>
                    <tr class="bg-white border-b ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            INCA KOLA
                        </th>
                        <td class="px-6 py-4">
                            Bebidas
                        </td>
                        <td class="px-6 py-4">
                            2
                        </td>
                        <td class="px-6 py-4">
                            2.00
                        </td>
                    </tr>
                    <tr class="bg-white ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            BROWNIE
                        </th>
                        <td class="px-6 py-4">
                            Postre
                        </td>
                        <td class="px-6 py-4">
                            1
                        </td>
                        <td class="px-6 py-4">
                            5.00
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<script>
import NavComponent from '@/components/NavBar.vue'
import XIcono from '@/components/icons/XIcono.vue'
import InformacionIcono from '@/components/icons/InformacionIcono.vue'
export default {
    components:{
        NavComponent,
        XIcono,
        InformacionIcono,
    }
}

</script>