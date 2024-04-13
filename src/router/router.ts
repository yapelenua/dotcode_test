import { createWebHistory, createRouter } from 'vue-router'

import BitTable from '../views/BitTable.vue'
import Desktop from '../views/Desktop.vue'

const routes = [
  { path: '/bittable', component: BitTable },
  { path: '/desktop', component: Desktop },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router