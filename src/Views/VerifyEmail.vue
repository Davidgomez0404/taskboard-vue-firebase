<template>
  <section class="flex flex-col items-center gap-4 p-6 text-center">
    <h2 class="text-xl font-bold">Verifica tu correo 📩</h2>

    <p>
      Te hemos enviado un email de verificación.<br />
      Revisa tu bandeja de entrada (y spam).
    </p>

    <button
      @click="resendEmail"
      class="border px-4 py-2"
    >
      Reenviar correo
    </button>

    <button
      @click="checkVerification"
      class="border px-4 py-2"
    >
      Ya he verificado
    </button>
  </section>
</template>

<script setup>
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const resendEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    alert('Correo reenviado 📩')
  } catch (error) {
    console.log(error.code)
    alert('No se pudo reenviar el correo')
  }
}

const checkVerification = async () => {
  await auth.currentUser.reload() 

  if (auth.currentUser.emailVerified) {
    router.push('/')
  } else {
    alert('Aún no has verificado el correo')
  }
}
</script>
