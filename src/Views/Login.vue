<template>
<section class="flex justify-center text-center p-5">
  <form @submit.prevent="login()" class="flex flex-col">
    <input type="email" id="correo" placeholder="Correo electronico" v-model="email" class="border">
    <input type="password" id="contraseña" placeholder="Contraseña" v-model="password" class="border">
    <button type="submit" class="border">Iniciar sesion</button>
    <router-link to="/register">¿No tienes cuenta?</router-link>

  </form>
</section>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';


//variables
const email = ref('')
const password = ref('')
const router= useRouter()
//funciones


const login = () =>{
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data)=>{
    console.log('succes')
    router.push('/')
  })
  .catch((error) => {
    console.log(error.code)
    alert(error.message)
  })  
}



</script>

<style>

</style>