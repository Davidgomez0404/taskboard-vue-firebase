<template>
<section class="flex justify-center text-center p-5 m-5">
  <form @submit.prevent="register()" class="flex flex-col gap-3">
    <input type="email" id="correo" placeholder="Correo electronico" v-model="email" class="border">
    <input type="password" id="contraseña" placeholder="Contraseña" v-model="password" class="border">
    <button type="submit" class="border">Registrarse</button>
    <router-link to="/login">¿Ya tienes cuenta?</router-link>

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
const router = useRouter()


const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await sendEmailVerification(userCredential.user)
    alert('Te hemos enviado un correo de verificación 📩')
    router.push('/login')
  } catch (error) {
    console.log(error.code)
    alert(error.message)
  }
}

</script>
