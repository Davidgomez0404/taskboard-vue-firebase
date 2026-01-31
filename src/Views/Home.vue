<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <!-- Contenido principal -->
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Tareas</h1>

      <!-- Filtro -->
      <select v-model="store.filter" class="border p-1 mb-4">
        <option value="all">Todas</option>
        <option value="completed">Finalizadas</option>
        <option value="pending">Pendientes</option>
        <option value="assigned">Asignadas</option>
      </select>

      <!-- Estados -->
      <div v-if="store.loading">Cargando tareas...</div>
      <div v-else-if="store.error" class="text-red-500">{{ store.error }}</div>

      <!-- Lista de tareas -->
      <ul v-else>
        <li
          v-for="task in store.tareasFiltradas"
          :key="task.id"
          class="border p-2 mb-2 rounded flex justify-between items-center"
        >
          <div>
            <p>{{ task.todo }}</p>
            <small>{{ task.completed ? '✅ Finalizada' : '⏳ Pendiente' }}</small>
          </div>

          <div>
            <button
              v-if="!task.completed && !task.assigned"
              @click="store.asignarTarea(task)"
              class="border px-2 py-1 rounded hover:bg-gray-100"
            >
              Agregar
            </button>

            <span
              v-else-if="!task.completed && task.assigned"
              class="text-gray-500 font-medium"
            >
              Asignada
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTareasStore } from '@/stores/tareas'
import NavBar from '@/components/NavBar.vue'

const store = useTareasStore()

onMounted(() => {
  store.obtenerDatos()
})
</script>
