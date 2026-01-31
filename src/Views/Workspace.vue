<template>
  <div>
    <NavBar />

    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Mi área de trabajo</h2>

      <div v-if="loading">Cargando tareas...</div>
      <div v-else-if="myTasks.length === 0" class="text-gray-500">
        No tienes tareas asignadas
      </div>

      <ul v-else>
        <li
          v-for="task in myTasks"
          :key="task.id"
          class="border p-2 mb-2 rounded flex justify-between items-center"
        >
          <div>
            <p>{{ task.todo }}</p>
            <small>{{ task.completed ? '✅ Finalizada' : '⏳ Pendiente' }}</small>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db, auth } from '@/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import NavBar from '@/components/NavBar.vue'

const myTasks = ref([])
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const refDoc = doc(db, 'workspaces', auth.currentUser.uid)
  const snap = await getDoc(refDoc)

  myTasks.value = []
  if (snap.exists()) {
    for (const t of snap.data().tasks) {
      if (!t.completed) myTasks.value.push(t)
    }
  }

  loading.value = false
})
</script>
