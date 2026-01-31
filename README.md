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
match /{document=\*\*} {
allow read, write: if true
}
}
}

# Descripción

Proyecto: Task Manager con Vue 3 y Firebase
Aplicación de gestión de tareas donde los usuarios pueden registrarse, verificar su email y acceder a una zona privada. Permite:

Listar tareas desde una API externa con filtros (todas, completadas, pendientes, asignadas).

Asignar tareas no finalizadas a su propio “workspace” (almacenado en Firestore, usando uid del usuario y un array tasks).

Ver sus tareas asignadas en un área de trabajo personal (/workspace).

Navegar entre Home y Workspace mediante un menú y cerrar sesión.

Control de acceso: solo usuarios logueados y con email verificado pueden acceder a la zona privada.

Implementacion de estilos mediante tailwind

# Firestore

En tareas.js es donde se ha realizado toda la lógica de la API, así como la actualización de tareas, el filtrado de tareas y la asignación de tareas a usuarios que ya se han logeado. La funcion principal es la de UseTareasStore, ya que es la función con la cual el resto de componentes pueden interactuar con el contenido de la Store.

Hay que introducir las claves creando un archivo.env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
