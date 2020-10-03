import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index";
import Countries from "@/views/Countries";
import About from "@/views/About"

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Countries
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
