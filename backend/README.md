# Backend Meditech Salud Digital

API REST con Node.js + Express + PostgreSQL para la plataforma de atención médica digital.

## Requisitos

- Node.js >= 18
- PostgreSQL >= 14

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno y configurarlas
cp .env.example .env

# 3. Crear la base de datos en PostgreSQL
createdb meditech_db

# 4. Ejecutar migraciones (crea todas las tablas)
npm run db:migrate

# 5. Iniciar en modo desarrollo
npm run dev

# O en producción
npm start
```

## Estructura

```
/backend-meditech
├── /src
│   ├── /config          # database.js, migrate.js
│   ├── /controllers     # Extraen datos del request, llaman al servicio
│   ├── /middlewares     # auth.js (JWT+RBAC), errorHandler.js, validate.js
│   ├── /models          # Único acceso a PostgreSQL (queries SQL)
│   ├── /routes          # Definición de endpoints y middlewares por ruta
│   ├── /services        # Lógica de negocio (validaciones, reglas)
│   ├── /utils           # jwt.js, response.js
│   └── app.js
└── server.js
```

## Endpoints principales

| Método | Ruta                          | Rol mínimo  |
|--------|-------------------------------|-------------|
| POST   | /api/auth/login               | público     |
| POST   | /api/auth/refresh             | público     |
| POST   | /api/auth/logout              | any         |
| GET    | /api/pacientes                | admin       |
| POST   | /api/pacientes                | admin       |
| GET    | /api/pacientes/:id            | medico      |
| PUT    | /api/pacientes/:id            | admin       |
| GET    | /api/medicos                  | paciente    |
| POST   | /api/medicos                  | admin       |
| GET    | /api/medicos/:id/disponibilidad | paciente  |
| PUT    | /api/medicos/:id/disponibilidad | medico    |
| GET    | /api/citas/mias               | any         |
| POST   | /api/citas                    | paciente    |
| PUT    | /api/citas/:id                | any         |
| GET    | /api/historial/:pacienteId    | medico      |
| POST   | /api/historial                | medico      |
| GET    | /api/dashboard/stats          | admin       |

## Formato de respuestas

**Éxito:**
```json
{ "status": "success", "data": { ... } }
```

**Éxito paginado:**
```json
{
  "status": "success",
  "data": [...],
  "meta": { "total": 42, "page": 1, "limit": 20, "pages": 3 }
}
```

**Error:**
```json
{ "status": "error", "message": "Descripción del error.", "code": "ERROR_CODE" }
```

## Autenticación

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <accessToken>
```

El `accessToken` expira en 15 minutos. Usa `POST /api/auth/refresh` con el `refreshToken`
para obtener un nuevo par de tokens sin necesidad de volver a hacer login.
