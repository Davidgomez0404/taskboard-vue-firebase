import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://dummyjson.com/todos'

export const useTareasStore = defineStore('tarea', () => {
  const tareas = ref([])

  const obtenerdatos = async () => {
    try {
      const response = await axios.get(API_URL)
      tareas.value.push(...response.data.todos)
    } catch (error) {
      console.error('Error al obtener tareas:', error)
    }
  }

  return { tareas, obtenerdatos }
})