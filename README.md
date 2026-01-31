
# TaskBoard David Gómez

Aplicación web para gestionar un tablón de tareas con:
- Vue 3 + Composition API
- Firebase Authentication (con verificación de email)
- Firestore (workspace por usuario)
- Axios (API de tareas)
- TailwindCSS
- Rutas protegidas con Vue Router
- Despliegue en Vercel
 # Cambios en reglas de firestore

 rules_version = '2'
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true
    }
  }
}
