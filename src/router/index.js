import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/Products/index.vue';
import ProductsCreate from '../views/Products/create.vue';
import ProductDetails from '../views/Products/productDetails.vue';
import ProductEdit from '../views/Products/edit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/create',
      name: 'productsCreate',
      component: ProductsCreate
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true
    },
    {
      path: '/product/:id/edit',
      name: 'ProductEdit',
      component: ProductEdit,
      props: true
    }


  ]
})

export default router
