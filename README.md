# Auth Microservice

Un servicio de autenticación completo construido con Next.js, NextAuth, Prisma y TypeScript. Esta aplicación proporciona una solución robusta de autenticación y gestión de usuarios que puede integrarse fácilmente con otras aplicaciones a través de su API RESTful.

## Características

- **Autenticación completa**
  - Registro de usuarios
  - Inicio de sesión (email/username + contraseña)
  - Cierre de sesión
  - Recuperación de contraseña
  - Verificación de email
  - Tokens JWT y refresh tokens

- **Gestión de usuarios**
  - CRUD completo para usuarios
  - Perfiles de usuario personalizables
  - Roles y permisos

- **API Keys**
  - Generación y gestión de API Keys
  - Autenticación basada en API Keys
  - Límites de uso y caducidad

- **Analíticas**
  - Seguimiento de eventos de autenticación
  - Estadísticas de uso del sistema
  - Visualización de datos con gráficos
  - Monitoreo de sesiones activas

- **Dashboard administrativo**
  - Interfaz de usuario moderna y responsiva
  - Estadísticas en tiempo real
  - Gestión de usuarios y API Keys
  - Visualización de logs y eventos

## Tecnologías

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, NextAuth v5
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT, Refresh Tokens, API Keys
- **Despliegue**: Compatible con Vercel, Docker

## Requisitos previos

- Node.js 18.x o superior
- PostgreSQL (o cualquier base de datos compatible con Prisma)
- Variables de entorno configuradas (ver `.example.env`)

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/auth-microservice.git
cd auth-microservice
```

2. Instala las dependencias

```bash
npm install
```

3. Configura las variables de entorno

```bash
cp .example.env .env.local
# Edita .env.local con tus configuraciones
```

4. Configura la base de datos

```bash
npx prisma migrate dev
```

5. Inicia el servidor de desarrollo

```bash
npm run dev
```

## Uso de la API

### Autenticación

- **POST /api/v1/auth/register** - Registrar un nuevo usuario
- **POST /api/v1/auth/login** - Iniciar sesión
- **POST /api/v1/auth/logout** - Cerrar sesión
- **POST /api/v1/auth/refresh-token** - Renovar token de acceso
- **POST /api/v1/auth/verify-email** - Verificar email
- **POST /api/v1/auth/forgot-password** - Solicitar restablecimiento de contraseña
- **POST /api/v1/auth/reset-password** - Restablecer contraseña

### Usuarios

- **GET /api/v1/users** - Listar usuarios
- **GET /api/v1/users/:id** - Obtener usuario por ID
- **PUT /api/v1/users/:id** - Actualizar usuario
- **DELETE /api/v1/users/:id** - Eliminar usuario

### Analíticas

- **GET /api/v1/analytics/auth-events** - Obtener eventos de autenticación
- **GET /api/v1/analytics/usage** - Obtener métricas de uso del sistema

## Dashboard

Accede al dashboard administrativo en `/dashboard` después de iniciar sesión como administrador.

El dashboard incluye:

- **Vista general**: Estadísticas clave del sistema (API Keys, Usuarios, Sesiones activas, Eventos)
- **Usuarios**: Gestión completa de usuarios
- **API Keys**: Creación y gestión de API Keys
- **Analíticas**: Visualización de eventos y métricas
- **Perfil**: Gestión del perfil de usuario

## Seguridad

- Todas las contraseñas se almacenan con hash
- Autenticación con JWT y refresh tokens
- Protección CSRF
- Rate limiting para prevenir ataques de fuerza bruta
- Validación de datos en todas las rutas de API

## Despliegue

### Vercel

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t auth-microservice .
docker run -p 3000:3000 auth-microservice
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia

MIT
