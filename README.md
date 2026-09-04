# Academia de Idiomas - API REST + GraphQL

Sistema de gestión para una academia de idiomas que expone servicios REST para la creación de alumnos y GraphQL para consultas avanzadas con filtros. Desarrollado como parte de la Práctica 1 de la materia de Ingeniería de Software.

## Requisitos Previos

Antes de iniciar, necesitas tener instalado:

- [Node.js](https://nodejs.org/es) (versión 18 o superior)
- [Git](https://git-scm.com/)

## Instalación y Ejecución Local

Sigue estos pasos para poner el proyecto en funcionamiento en tu computadora.

### 1. Clonar el repositorio

Abre una terminal (Git Bash, Command Prompt o PowerShell) y ejecuta:

git clone https://github.com/LeonOcto/AEIDS_Practica1.git

### 2. Acceder a la carpeta del proyecto

cd AEIDS_Practica1/REST/mongo-rest-api

### 3. Instalar dependencias

npm install

si no se instala ejecutar desde el comand prompt

### 4. Configurar la conexión a MongoDB

El proyecto necesita una base de datos MongoDB (puedes usar MongoDB Atlas gratis).
Ya hay una conexión predeterminada en connection.env

### 5. Iniciar el servidor

Desde la terminal
node server.js

### 6. Probar la aplicación
Abre tu navegador y visita:

Frontend de prueba: http://localhost:5000 – Desde aquí puedes agregar alumnos usando el formulario y ver la lista actualizada.

GraphQL Playground: http://localhost:5000/graphql – Interfaz interactiva para probar consultas GraphQL.

REST API: http://localhost:5000/api/alumnos – Puedes hacer peticiones GET y POST desde Postman o curl.
