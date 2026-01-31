<template>
<section class="flex justify-center text-center p-5">
  <form @submit.prevent="login()" class="flex flex-col">
    <input type="email" id="correo" placeholder="Correo electronico" v-model="email" class="border">
    <input type="password" id="contraseña" placeholder="Contraseña" v-model="password" class="border">
    <p v-if="errMsg">{{ errMsg }}</p>
    <button type="submit" class="border">Iniciar sesion</button>
    <router-link to="/register">¿No tienes cuenta?</router-link>
    
  </form>
</section>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.js'


//variables
const email = ref('')
const password = ref('')
const router= useRouter()
const errMsg = ref()
const isLoggedIn = ref(false)
//funciones


const login = async () => {
  try{ 
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    if (!user.emailVerified) {
      router.push('/verifyemail')  
    }else{
      router.push('/')
    }
  }catch(error) {
    console.log(error.code)
    switch (error.code){
      case "auth/invalid-email":
        errMsg.value="Correo invalido";
        break
      case "auth/user-not-found":
        errMsg.value="No hay cuentas con este correo"
        break
      case "auth/wrong-password":
        errMsg.value="Contraseña incorrecta"
        break
      default:
        errMsg.value= "Email o contraseña incorrectos"
        break
    }
  }
}


</script>

<style>

</style>