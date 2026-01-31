<template>
<section class="flex justify-center text-center p-5 m-5">
  <form @submit.prevent="register()" class="flex flex-col gap-3 w-80">
    <input type="email" placeholder="Correo electrónico" v-model="email" class="border p-2 rounded">
    <input type="password" placeholder="Contraseña" v-model="password" class="border p-2 rounded">

    <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>
    <p v-if="loading" class="text-gray-500">Creando usuario...</p>

    <button type="submit" class="border px-2 py-1 rounded" :disabled="loading">
      Registrarse
    </button>

    <router-link to="/login" class="mt-2 text-blue-500 hover:underline">
      ¿Ya tienes cuenta?
    </router-link>
  </form>
</section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '@/firebase.js'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  errMsg.value = ''
  if (!email.value || !password.value) {
    errMsg.value = 'Debes ingresar email y contraseña'
    return
  }

  loading.value = true
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await sendEmailVerification(userCredential.user)
    alert('Te hemos enviado un correo de verificación 📩')
    router.push('/login')
  } catch (error) {
    switch(error.code){
      case 'auth/email-already-in-use':
        errMsg.value = 'Este correo ya está registrado'
        break
      case 'auth/invalid-email':
        errMsg.value = 'Correo inválido'
        break
      case 'auth/weak-password':
        errMsg.value = 'Contraseña demasiado débil'
        break
      default:
        errMsg.value = error.message
    }
  }
  loading.value = false
}
</script>
