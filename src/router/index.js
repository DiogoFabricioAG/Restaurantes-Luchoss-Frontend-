import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PagPrincipal.vue')
    },
    {
      path: '/option/',
      name: 'option',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/pedidos/',
      name: 'pedidos',
      component: () => import('../views/PedidosCliente.vue')
    },

    {
      path: '/register/',
      name: 'register',
      component: () => import('../views/FormRegister.vue')
    },
    {
      path: '/login/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/sucursales/',
      name: 'sucursales',
      component: () => import('../views/Sucursales.vue')
    },
    {
      path: '/carrito/',
      name: 'carrito',
      component: () => import('../views/Carrito.vue')
    },
    {
      path: '/platillos',
      name: 'platillos',
      component: () => import('../views/Tienda.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
