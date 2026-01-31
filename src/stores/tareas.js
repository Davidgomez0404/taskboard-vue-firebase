import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { db, auth } from '@/firebase.js'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'

const API_URL = 'https://dummyjson.com/todos'

export const useTareasStore = defineStore('tarea', () => {
  const tareas = ref([])           // todas las tareas de la API
  const loading = ref(false)       // estado de carga
  const error = ref(null)          // mensaje de error
  const filter = ref('all')        // all | completed | pending | assigned

  // ----------------------------------------
  // 1️⃣ Obtener tareas de la API
  // ----------------------------------------
  const obtenerDatos = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(API_URL)

      for (const t of response.data.todos) {
        tareas.value.push({
          id: t.id,
          todo: t.todo,
          completed: t.completed,
          assigned: false
        })
      }

      await actualizarAsignadas()

    } catch (err) {
      console.error(err)
      error.value = 'Error al cargar tareas'
    }

    loading.value = false
  }

  // ----------------------------------------
  // 2️⃣ Actualizar tareas asignadas desde Firestore
  // ----------------------------------------
  const actualizarAsignadas = async () => {
    const snapshot = await getDocs(collection(db, 'workspaces'))
    const assignedIds = []

    for (const docSnap of snapshot.docs) {
      const tasks = docSnap.data().tasks
      if (tasks) {
        for (const t of tasks) {
          assignedIds.push(t.id)
        }
      }
    }

    for (const task of tareas.value) {
      if (assignedIds.includes(task.id)) {
        task.assigned = true
      }
    }
  }

  // ----------------------------------------
  // 3️⃣ Filtrado de tareas
  // ----------------------------------------
  const tareasFiltradas = computed(() => {
    const result = []
    for (const t of tareas.value) {
      if (filter.value === 'completed' && t.completed) result.push(t)
      else if (filter.value === 'pending' && !t.completed) result.push(t)
      else if (filter.value === 'assigned' && t.assigned) result.push(t)
      else if (filter.value === 'all') result.push(t)
    }
    return result
  })

  // ----------------------------------------
  // 4️⃣ Asignar tarea al usuario logueado
  // ----------------------------------------
  const asignarTarea = async (task) => {
    if (task.completed || task.assigned) return

    const userRef = doc(db, 'workspaces', auth.currentUser.uid)
    const snap = await getDoc(userRef)

    if (!snap.exists()) {
      await setDoc(userRef, { tasks: [task] })
    } else {
      await updateDoc(userRef, { tasks: arrayUnion(task) })
    }

    task.assigned = true
  }

  return {
    tareas,
    tareasFiltradas,
    filter,
    loading,
    error,
    obtenerDatos,
    asignarTarea,
    actualizarAsignadas
  }
})
