<template>
  <section>
    <h1>Tareas</h1>

    <ul v-if="TareasStore.tareas.length">
      <li v-for="tarea in TareasStore.tareas" :key="tarea.id">
        <span>
          {{ tarea.todo }}
        </span>

        <span v-if="tarea.completed"> ✅</span>
        <span v-else> ❌</span>
      </li>
    </ul>

    <p v-else>Cargando tareas...</p>
  </section>
</template>

<script setup>
import { useTareasStore } from '@/stores/tareas'
import { onMounted } from 'vue'

const TareasStore = useTareasStore()

onMounted(async () => {
  await TareasStore.obtenerdatos()
})
</script>
