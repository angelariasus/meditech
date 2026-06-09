# Ecosistema Meditech - Salud Digital 🏥

Meditech es una plataforma integral de grado médico diseñada para administrar eficientemente pacientes, médicos, historiales clínicos y agendamiento de citas en clínicas y hospitales.

El ecosistema cuenta con una arquitectura dividida en 3 capas fundamentales para proveer una solución tecnológica completa y moderna: una API robusta, un portal administrativo web y una aplicación móvil multiplataforma.

## 🏗️ Arquitectura del Proyecto

Este repositorio monorepo alberga tres proyectos interconectados:

### 1. `backend/` (API RESTful)
El núcleo central del sistema, que orquesta la base de datos y la seguridad, asegurando las validaciones del negocio.
*   **Entorno:** Node.js + Express
*   **Base de Datos:** PostgreSQL
*   **ORM:** Prisma
*   **Despliegue:** Contenedores Docker (`docker-compose`)
*   **Seguridad:** Autenticación JWT y Refresh Tokens
*   *Revisa `backend/README.md` o el contrato API para más información.*

### 2. `frontend/` (Portal Administrativo Web)
La interfaz principal de gestión para los secretarios y administradores del hospital, permitiendo una visualización de métricas y gestión profunda.
*   **Framework:** Angular 17+
*   **Estilos:** TailwindCSS (Fidelidad 100% de UI/UX)
*   **Características:** Paneles de Control dinámicos (Dashboard), listas maestras de datos e integraciones reactivas.
*   **Ejecución:** `npx ng serve`

### 3. `mobile/` (Aplicación Móvil para Usuarios)
La aplicación para iOS y Android orientada a facilitar consultas rápidas, disponibilidad y agendamiento de citas sobre la marcha.
*   **Framework:** React Native + Expo SDK
*   **Enrutamiento:** Expo Router (Rutas basadas en archivos)
*   **Estilos:** NativeWind v4 (Traductor de TailwindCSS para React Native)
*   **Características:** Almacenamiento cifrado de credenciales (`expo-secure-store`) y consumo de las mismas APIs que la web.
*   **Ejecución:** `npx expo start`

---

## 🚀 Guía de Inicio Rápido (Local)

Para ejecutar este ecosistema completo en tu máquina de desarrollo, sigue estos pasos en terminales separadas:

### A) Levantar la Base de Datos y Backend
Desde la raíz del proyecto, ingresa a la carpeta `backend` y levanta el contenedor de la base de datos PostgreSQL y la API.

```bash
cd backend
docker compose up --build
```
> La API estará escuchando en `http://localhost:3000/api`.

### B) Levantar el Frontend (Web)
En otra terminal, corre la aplicación Angular:

```bash
cd frontend
npm install
npm start
```
> El portal web estará disponible en `http://localhost:4200`.

### C) Levantar el Cliente Móvil
Abre una tercera terminal y arranca el entorno de Expo:

```bash
cd mobile
npm install
npm start
```
> Escanea el código QR generado en la terminal utilizando la aplicación **Expo Go** en tu dispositivo físico, o presiona la tecla `a` para abrir un emulador Android (requiere Android Studio).

---

## 🔐 Credenciales de Prueba

Para probar el flujo de Login en cualquiera de los dos clientes (Web o Móvil), asegúrate de usar un usuario de prueba creado (mock o seed) en la base de datos:

*   **Email:** `admin@meditech.com` *(O el que hayas registrado)*
*   **Password:** `123456`

---
*Meditech - Soluciones integrales para la salud. Construido con estándares modernos de UI/UX.*
