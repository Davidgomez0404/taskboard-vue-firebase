<template>
<section class="flex justify-center text-center p-5">
  <form @submit.prevent="login()" class="flex flex-col gap-2 w-80">
    <input type="email" placeholder="Correo electrónico" v-model="email" class="border p-2 rounded">
    <input type="password" placeholder="Contraseña" v-model="password" class="border p-2 rounded">

    <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>
    <p v-if="loading" class="text-gray-500">Verificando...</p>

    <button type="submit" class="border px-2 py-1 rounded" :disabled="loading">
      Iniciar sesión
    </button>

    <router-link to="/register" class="mt-2 text-blue-500 hover:underline">
      ¿No tienes cuenta?
    </router-link>
  </form>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.js'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const loading = ref(false)
const router = useRouter()

const login = async () => {
  errMsg.value = ''
  loading.value = true

  try { 
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    if (!user.emailVerified) {
      router.push('/verifyemail')  
    } else {
      router.push('/')
    }

  } catch(error) {
    switch (error.code){
      case "auth/invalid-email":
        errMsg.value = "Correo inválido";
        break
      case "auth/user-not-found":
        errMsg.value = "No hay cuentas con este correo";
        break
      case "auth/wrong-password":
        errMsg.value = "Contraseña incorrecta";
        break
      default:
        errMsg.value = "Email o contraseña incorrectos";
    }
  }

  loading.value = false
}
</script>
