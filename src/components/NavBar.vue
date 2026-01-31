<template>
  <nav class="flex justify-between items-center p-4 border-b mb-4">
    <!-- Menú de navegación -->
    <div class="flex gap-4">
      <router-link to="/" class="hover:underline">Tareas</router-link>
      <router-link to="/workspace" class="hover:underline">Mi Workspace</router-link>
    </div>

    <!-- Botón cerrar sesión -->
    <button @click="logout" class="border px-2 py-1">
      Cerrar sesión
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase.js'

const router = useRouter()

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/login')  // redirige al login
  } catch (err) {
    console.error('Error al cerrar sesión', err)
  }
}
</script>
