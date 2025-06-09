# Manual de APIs - Applicados Backend

Este documento proporciona una guía completa para utilizar las APIs disponibles en el backend de Applicados.

## Índice

1. [Autenticación](#autenticación)
2. [Materias (Subjects)](#materias-subjects)
3. [Niveles de Materias (Subject Levels)](#niveles-de-materias-subject-levels)
4. [Cuestionarios (Questionnaires)](#cuestionarios-questionnaires)
5. [Preguntas (Questions)](#preguntas-questions)
6. [Preguntas Aleatorias](#preguntas-aleatorias)
7. [Búsqueda de Preguntas](#búsqueda-de-preguntas)
8. [Estadísticas de Nivel](#estadísticas-de-nivel)

## Requisitos Generales

Todas las APIs de la versión 1 (`/api/v1/`) requieren autenticación mediante una API Key válida. Esta API Key debe enviarse en el encabezado de la solicitud:

```
X-API-KEY: tu_api_key_aquí
```

## Autenticación

### POST /api/v1/auth/register

Registra un nuevo usuario en el sistema.

**Cuerpo de la solicitud:**
```json
{
  "username": "string (requerido)",
  "email": "string (requerido)",
  "password": "string (requerido)",
  "name": "string (opcional)",
  "company_name": "string (opcional)",
  "phone": "string (opcional)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/login

Inicia sesión con credenciales (email o nombre de usuario).

**Cuerpo de la solicitud:**
```json
{
  "emailOrUsername": "string (requerido, puede ser email o nombre de usuario)",
  "password": "string (requerido)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "name": "string (opcional)"
  },
  "token": "string (JWT token)",
  "refresh_token": "string",
  "expires_in": "number (segundos)",
  "token_type": "string (Bearer)",
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/logout

Cierra la sesión actual del usuario.

**Cuerpo de la solicitud:**
```json
{
  "token": "string (opcional, se puede omitir si se envía el token en el encabezado Authorization)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "message": "string (mensaje de éxito)",
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/refresh-token

Renueva el token de acceso usando un refresh token.

**Cuerpo de la solicitud:**
```json
{
  "refreshToken": "string (requerido)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "token": "string (nuevo JWT token)",
  "refreshToken": "string (nuevo refresh token)",
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/verify-email

Verifica el email de un usuario usando un token.

**Cuerpo de la solicitud:**
```json
{
  "token": "string (requerido)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/forgot-password

Solicita un token para restablecer la contraseña.

**Cuerpo de la solicitud:**
```json
{
  "email": "string (requerido)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "message": "string",
  "error": "string (si hay error)"
}
```

### POST /api/v1/auth/reset-password

Restablece la contraseña usando un token.

**Cuerpo de la solicitud:**
```json
{
  "token": "string (requerido)",
  "password": "string (requerido)",
  "confirmPassword": "string (requerido)"
}
```

**Respuesta:**
```json
{
  "success": true|false,
  "error": "string (si hay error)"
}
```

## Materias (Subjects)

### GET /api/v1/subjects

Obtiene todas las materias disponibles para la API Key proporcionada.

**Parámetros de consulta:**
- `test_type_id` (opcional): Filtrar materias por tipo de prueba

**Respuesta:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "levels": [
      {
        "id": "string",
        "title": "string",
        "reference_title": "string",
        "order": "number",
        "number_of_questions": "number",
        "approximate_time_minutes": "number"
      }
    ]
  }
]
```

## Niveles de Materias (Subject Levels)

### GET /api/v1/subject-levels

Obtiene todos los niveles disponibles para una materia específica.

**Parámetros de consulta:**
- `subject_id` (requerido): ID de la materia

**Respuesta:**
```json
[
  {
    "id": "string",
    "title": "string",
    "reference_title": "string",
    "order": "number",
    "number_of_questions": "number",
    "approximate_time_minutes": "number",
    "questionnaires": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "order": "number"
      }
    ]
  }
]
```

### GET /api/v1/subject-levels/[id]

Obtiene un nivel específico con sus detalles.

**Respuesta:**
```json
{
  "id": "string",
  "title": "string",
  "reference_title": "string",
  "order": "number",
  "number_of_questions": "number",
  "approximate_time_minutes": "number",
  "subject": {
    "id": "string",
    "name": "string"
  },
  "questionnaires": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "order": "number"
    }
  ]
}
```

## Cuestionarios (Questionnaires)

### GET /api/v1/questionnaires

Obtiene todos los cuestionarios disponibles para un nivel específico.

**Parámetros de consulta:**
- `level_id` (requerido): ID del nivel

**Respuesta:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "order": "number",
    "_count": {
      "questions": "number"
    }
  }
]
```

### GET /api/v1/questionnaires/[id]

Obtiene un cuestionario específico con todas sus preguntas.

**Respuesta:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "order": "number",
  "subjectLevel": {
    "id": "string",
    "title": "string",
    "reference_title": "string",
    "subject": {
      "id": "string",
      "name": "string"
    }
  },
  "questions": [
    {
      "id": "string",
      "text": "string",
      "question_type": "MULTIPLE_CHOICE_SINGLE|MULTIPLE_CHOICE_MULTIPLE|TRUE_FALSE",
      "explanation": "string",
      "extra_info": "string",
      "points": "number",
      "order": "number",
      "difficulty": "number",
      "tags": "string",
      "answerOptions": [
        {
          "id": "string",
          "text": "string",
          "is_correct": "boolean",
          "order": "number"
        }
      ]
    }
  ]
}
```

## Preguntas (Questions)

### GET /api/v1/level-questions

Obtiene todas las preguntas de un nivel específico, agrupadas por cuestionarios.

**Parámetros de consulta:**
- `level_id` (requerido): ID del nivel

**Respuesta:**
```json
{
  "level": {
    "id": "string",
    "title": "string",
    "reference_title": "string",
    "subject": {
      "id": "string",
      "name": "string"
    }
  },
  "questionnaires": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "order": "number",
      "questions": [
        {
          "id": "string",
          "text": "string",
          "question_type": "MULTIPLE_CHOICE_SINGLE|MULTIPLE_CHOICE_MULTIPLE|TRUE_FALSE",
          "explanation": "string",
          "extra_info": "string",
          "points": "number",
          "order": "number",
          "difficulty": "number",
          "tags": "string",
          "answerOptions": [
            {
              "id": "string",
              "text": "string",
              "is_correct": "boolean",
              "order": "number"
            }
          ]
        }
      ]
    }
  ]
}
```

## Preguntas Aleatorias

### GET /api/v1/random-questions

Obtiene un conjunto aleatorio de preguntas de un nivel específico.

**Parámetros de consulta:**
- `level_id` (requerido): ID del nivel
- `count` (opcional, default: 10): Número de preguntas aleatorias a obtener
- `difficulty` (opcional): Filtrar por dificultad (1-5)

**Respuesta:**
```json
{
  "level": {
    "id": "string",
    "title": "string",
    "reference_title": "string",
    "subject": {
      "id": "string",
      "name": "string"
    }
  },
  "total_available": "number",
  "questions_returned": "number",
  "questions": [
    {
      "id": "string",
      "text": "string",
      "question_type": "MULTIPLE_CHOICE_SINGLE|MULTIPLE_CHOICE_MULTIPLE|TRUE_FALSE",
      "explanation": "string",
      "extra_info": "string",
      "points": "number",
      "difficulty": "number",
      "tags": "string",
      "questionnaire_id": "string",
      "answerOptions": [
        {
          "id": "string",
          "text": "string",
          "is_correct": "boolean",
          "order": "number"
        }
      ]
    }
  ]
}
```

## Búsqueda de Preguntas

### GET /api/v1/search-questions

Busca preguntas por texto, etiquetas, materia o nivel.

**Parámetros de consulta:**
- `query` (opcional): Texto a buscar en las preguntas
- `tags` (opcional): Etiquetas separadas por comas
- `subject_id` (opcional): ID de la materia
- `level_id` (opcional): ID del nivel
- `limit` (opcional, default: 20): Número máximo de resultados

**Respuesta:**
```json
{
  "total_results": "number",
  "questions": [
    {
      "id": "string",
      "text": "string",
      "question_type": "MULTIPLE_CHOICE_SINGLE|MULTIPLE_CHOICE_MULTIPLE|TRUE_FALSE",
      "explanation": "string",
      "extra_info": "string",
      "points": "number",
      "difficulty": "number",
      "tags": "string",
      "questionnaire": {
        "id": "string",
        "name": "string",
        "subjectLevel": {
          "id": "string",
          "title": "string",
          "subject": {
            "id": "string",
            "name": "string"
          }
        }
      },
      "answerOptions": [
        {
          "id": "string",
          "text": "string",
          "is_correct": "boolean",
          "order": "number"
        }
      ]
    }
  ]
}
```

## Estadísticas de Nivel

### GET /api/v1/level-stats

Obtiene estadísticas detalladas sobre las preguntas disponibles en un nivel específico.

**Parámetros de consulta:**
- `level_id` (requerido): ID del nivel

**Respuesta:**
```json
{
  "level": {
    "id": "string",
    "title": "string",
    "reference_title": "string",
    "subject": {
      "id": "string",
      "name": "string"
    }
  },
  "total_questionnaires": "number",
  "total_questions": "number",
  "questionnaires": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "order": "number",
      "question_count": "number"
    }
  ],
  "question_types": [
    {
      "type": "MULTIPLE_CHOICE_SINGLE|MULTIPLE_CHOICE_MULTIPLE|TRUE_FALSE",
      "count": "number",
      "percentage": "number"
    }
  ],
  "difficulty_distribution": [
    {
      "difficulty": "number",
      "count": "number",
      "percentage": "number"
    }
  ]
}
```

## Ejemplos de Uso

### Flujo de obtención de preguntas para un cuestionario

1. Obtener todas las materias disponibles:
   ```
   GET /api/v1/subjects
   ```

2. Obtener los niveles de una materia específica:
   ```
   GET /api/v1/subject-levels?subject_id=<ID_MATERIA>
   ```

3. Obtener los cuestionarios de un nivel específico:
   ```
   GET /api/v1/questionnaires?level_id=<ID_NIVEL>
   ```

4. Obtener un cuestionario específico con todas sus preguntas:
   ```
   GET /api/v1/questionnaires/<ID_CUESTIONARIO>
   ```

### Flujo alternativo (obtención directa de preguntas por nivel)

1. Obtener todas las materias disponibles:
   ```
   GET /api/v1/subjects
   ```

2. Obtener los niveles de una materia específica:
   ```
   GET /api/v1/subject-levels?subject_id=<ID_MATERIA>
   ```

3. Obtener directamente todas las preguntas del nivel:
   ```
   GET /api/v1/level-questions?level_id=<ID_NIVEL>
   ```

### Obtención de preguntas aleatorias para práctica

```
GET /api/v1/random-questions?level_id=<ID_NIVEL>&count=5&difficulty=3
```

### Búsqueda de preguntas por texto o etiquetas

```
GET /api/v1/search-questions?query=algebra&tags=ecuaciones,polinomios&limit=10
```

### Obtención de estadísticas de un nivel

```
GET /api/v1/level-stats?level_id=<ID_NIVEL>
```