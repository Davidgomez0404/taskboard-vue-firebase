import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {auth} from '@/firebase'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //privada area
    {path: '/', component: () => import('../Views/Home.vue'), meta:{requiresAuth: true, }},
    {path: '/workspace', component: () => import('../Views/Workspace.vue'), meta:{requiresAuth: true, requiereVerificado:true}},
      {path: '/verifyemail', component: () => import('../Views/VerifyEmail.vue'), meta:{requiresAuth: true}},
    //public area
    {path: '/login', component: () => import('../Views/Login.vue')},
    {path: '/register', component: () => import('../Views/Register.vue')},
  
    

  ],
})

router.beforeEach((to, from, next) =>{
  onAuthStateChanged(auth, (user) =>{
    if (to.meta.requiresAuth && !user) {
      next('/login')
      return
    }
    if(user && !user.emailVerified && 
    (to.path === '/' || to.path === '/workspace')
    ){
      next('/verifyemail')
      return
    }
    next()
  })
})

export default router
