import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import listUMKM from '../views/ListUMKM.vue'
import DetailUMKM from '../components/UMKM/UMKM-Detail.vue'
import LoginPage from '../views/Admin/LoginPage.vue'
import DashboardAdmin from '../views/Admin/Dashboard.vue'
import CreateUMKM from '../views/Admin/AddUMKM.vue'
import EditUMKM from '../views/Admin/EditUMKM.vue'
import ErrorPage from '../views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/list-umkm',
      name: 'List UMKM',
      component: listUMKM,
    },
    {
      path: '/detail-umkm/:id',
      name: 'Detail UMKM',
      component: DetailUMKM,
      props: true // allows access to `id` as a prop in the component
    },
    {
      path: '/admin',
      name: 'Admin',
      component: LoginPage,
    },
    {
      path: '/admin/dashboard',
      name: 'Admin Dashboard',
      component: DashboardAdmin,
    },
    {
      path: '/admin/create',
      name: 'Admin Create',
      component: CreateUMKM,
    },
    {
      path: '/admin/edit',
      name: 'Admin Edit',
      component: EditUMKM,
    },
    // In router/index.ts or router.js
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorPage,
    },
  ],
})

export default router
