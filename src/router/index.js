import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //privada area
    {path: '/', component: () => import('../Views/Home.vue'), meta:{requiereAuth: true, requiereVerificado: true}},
    {path: '/workspace', component: () => import('../Views/Workspace.vue'), meta:{requiereAuth: true, requiereVerificado:true}},

    //public area
    {path: '/login', component: () => import('../Views/Login.vue')},
    {path: '/register', component: () => import('../Views/Register.vue')},
    {path: '/verifyemail', component: () => import('../Views/VerifyEmail.vue')},
    

  ],
})

export default router
