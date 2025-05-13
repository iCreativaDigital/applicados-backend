"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState("auth")
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Documentación de la API</h1>
      
      <Tabs defaultValue="auth" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="auth">Autenticación</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="auth">
          <div className="grid gap-6">
            <EndpointCard
              title="POST /api/v1/auth/register"
              description="Registra un nuevo usuario en el sistema"
              requestBody={{
                username: "string (requerido)",
                email: "string (requerido)",
                password: "string (requerido)",
                name: "string (opcional)",
                company_name: "string (opcional)",
                phone: "string (opcional)"
              }}
              response={{
                success: "boolean",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/login"
              description="Inicia sesión con credenciales (email o nombre de usuario)"
              requestBody={{
                emailOrUsername: "string (requerido, puede ser email o nombre de usuario)",
                password: "string (requerido)"
              }}
              response={{
                success: "boolean",
                token: "string (JWT token)",
                refreshToken: "string",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/logout"
              description="Cierra la sesión actual"
              requestBody={{
                token: "string (opcional, token actual)"
              }}
              response={{
                success: "boolean"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/refresh-token"
              description="Renueva el token de acceso usando un refresh token"
              requestBody={{
                refreshToken: "string (requerido)"
              }}
              response={{
                success: "boolean",
                token: "string (nuevo JWT token)",
                refreshToken: "string (nuevo refresh token)",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/verify-email"
              description="Verifica el email de un usuario usando un token"
              requestBody={{
                token: "string (requerido)"
              }}
              response={{
                success: "boolean",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/forgot-password"
              description="Solicita un token para restablecer la contraseña"
              requestBody={{
                email: "string (requerido)"
              }}
              response={{
                success: "boolean",
                message: "string",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="POST /api/v1/auth/reset-password"
              description="Restablece la contraseña usando un token"
              requestBody={{
                token: "string (requerido)",
                password: "string (requerido)",
                confirmPassword: "string (requerido)"
              }}
              response={{
                success: "boolean",
                error: "string (si hay error)"
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid gap-6">
            <EndpointCard
              title="GET /api/v1/users"
              description="Lista todos los usuarios (con paginación)"
              requestBody={{
                page: "number (opcional, default: 1)",
                limit: "number (opcional, default: 10)"
              }}
              response={{
                success: "boolean",
                data: "array de usuarios",
                total: "number",
                page: "number",
                totalPages: "number",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="GET /api/v1/users/:id"
              description="Obtiene un usuario por su ID"
              requestBody={{}}
              response={{
                success: "boolean",
                data: "objeto usuario",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="PUT /api/v1/users/:id"
              description="Actualiza un usuario existente"
              requestBody={{
                name: "string (opcional)",
                email: "string (opcional)",
                username: "string (opcional)",
                company_name: "string (opcional)",
                phone: "string (opcional)"
              }}
              response={{
                success: "boolean",
                data: "objeto usuario actualizado",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="DELETE /api/v1/users/:id"
              description="Elimina un usuario"
              requestBody={{}}
              response={{
                success: "boolean",
                error: "string (si hay error)"
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6">
            <EndpointCard
              title="GET /api/v1/analytics/auth-events"
              description="Obtiene eventos de autenticación"
              requestBody={{
                startDate: "string (opcional, formato ISO)",
                endDate: "string (opcional, formato ISO)",
                page: "number (opcional, default: 1)",
                limit: "number (opcional, default: 10)",
                eventType: "string (opcional, filtro por tipo de evento)"
              }}
              response={{
                success: "boolean",
                data: "array de eventos",
                total: "number",
                page: "number",
                totalPages: "number",
                error: "string (si hay error)"
              }}
            />
            
            <EndpointCard
              title="GET /api/v1/analytics/usage"
              description="Obtiene métricas de uso del sistema"
              requestBody={{
                startDate: "string (opcional, formato ISO)",
                endDate: "string (opcional, formato ISO)"
              }}
              response={{
                success: "boolean",
                data: {
                  totalUsers: "number",
                  totalLogins: "number",
                  failedLogins: "number",
                  registrations: "number",
                  activeApiKeys: "number"
                },
                error: "string (si hay error)"
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EndpointCardProps {
  title: string
  description: string
  requestBody: Record<string, string>
  response: Record<string, any>
  endpoint?: string
}

function EndpointCard({ title, description, requestBody, response, endpoint }: EndpointCardProps) {
  const [activeCodeTab, setActiveCodeTab] = useState("curl")
  
  // Extraer el endpoint de la URL completa si no se proporciona explícitamente
  const apiEndpoint = endpoint || title.split(" ")[1]
  const method = title.split(" ")[0]
  
  // Generar ejemplos de código
  const generateCurlExample = () => {
    let curlCmd = `curl -X ${method} https://api.example.com${apiEndpoint}`
    
    if (Object.keys(requestBody).length > 0) {
      const bodyParams: Record<string, any> = {}
      Object.keys(requestBody).forEach((key: string) => {
        // Crear un valor de ejemplo basado en el tipo
        const description = requestBody[key]
        if (description.includes("email")) {
          bodyParams[key] = "usuario@ejemplo.com"
        } else if (description.includes("password")) {
          bodyParams[key] = "contraseña123"
        } else if (description.includes("username")) {
          bodyParams[key] = "usuario123"
        } else if (description.includes("token")) {
          bodyParams[key] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        } else if (description.includes("number")) {
          bodyParams[key] = 1
        } else if (description.includes("boolean")) {
          bodyParams[key] = true
        } else {
          bodyParams[key] = `valor_${key}`
        }
      })
      
      curlCmd += ` \
  -H "Content-Type: application/json" \
  -d '${JSON.stringify(bodyParams, null, 2)}'`
    }
    
    // Agregar encabezado de API Key (siempre requerido)
    curlCmd += ` \
  -H "X-API-Key: YOUR_API_KEY"`
    
    // Agregar encabezado de autorización JWT si es necesario
    if (!title.includes("/auth/login") && !title.includes("/auth/register") && !title.includes("/auth/forgot-password")) {
      curlCmd += ` \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`
    }
    
    return curlCmd
  }
  
  const generateJsExample = () => {
    const bodyParams: Record<string, any> = {}
    Object.keys(requestBody).forEach((key: string) => {
      // Crear un valor de ejemplo basado en el tipo
      const description = requestBody[key]
      if (description.includes("email")) {
        bodyParams[key] = "usuario@ejemplo.com"
      } else if (description.includes("password")) {
        bodyParams[key] = "contraseña123"
      } else if (description.includes("username")) {
        bodyParams[key] = "usuario123"
      } else if (description.includes("token")) {
        bodyParams[key] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      } else if (description.includes("number")) {
        bodyParams[key] = 1
      } else if (description.includes("boolean")) {
        bodyParams[key] = true
      } else {
        bodyParams[key] = `valor_${key}`
      }
    })
    
    const needsAuth = !title.includes("/auth/login") && !title.includes("/auth/register") && !title.includes("/auth/forgot-password")
    
    return `// Usando fetch API
async function ${method.toLowerCase()}${apiEndpoint.split("/").pop() || "Endpoint"}() {
  try {
    const response = await fetch("https://api.example.com${apiEndpoint}", {
      method: "${method}",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "YOUR_API_KEY"${needsAuth ? ',\n        "Authorization": "Bearer YOUR_JWT_TOKEN"' : ''}
      }${Object.keys(requestBody).length > 0 ? ',\n      body: JSON.stringify(' + JSON.stringify(bodyParams, null, 2) + ')' : ''}
    });
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}`
  }
  
  const generatePhpExample = () => {
    const bodyParams: Record<string, any> = {}
    Object.keys(requestBody).forEach((key: string) => {
      // Crear un valor de ejemplo basado en el tipo
      const description = requestBody[key]
      if (description.includes("email")) {
        bodyParams[key] = "usuario@ejemplo.com"
      } else if (description.includes("password")) {
        bodyParams[key] = "contraseña123"
      } else if (description.includes("username")) {
        bodyParams[key] = "usuario123"
      } else if (description.includes("token")) {
        bodyParams[key] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      } else if (description.includes("number")) {
        bodyParams[key] = 1
      } else if (description.includes("boolean")) {
        bodyParams[key] = true
      } else {
        bodyParams[key] = `valor_${key}`
      }
    })
    
    const needsAuth = !title.includes("/auth/login") && !title.includes("/auth/register") && !title.includes("/auth/forgot-password")
    
    return `<?php\n$url = "https://api.example.com${apiEndpoint}";\n\n$curl = curl_init($url);\ncurl_setopt($curl, CURLOPT_URL, $url);\ncurl_setopt($curl, CURLOPT_RETURNTRANSFER, true);\n\n$headers = array(\n   "Content-Type: application/json",\n   "X-API-Key: YOUR_API_KEY",${needsAuth ? '\n   "Authorization: Bearer YOUR_JWT_TOKEN",' : ''}\n);\ncurl_setopt($curl, CURLOPT_HTTPHEADER, $headers);${method !== "GET" ? `\n\ncurl_setopt($curl, CURLOPT_CUSTOMREQUEST, "${method}");` : ''}${Object.keys(requestBody).length > 0 ? `\n\n$data = ${JSON.stringify(bodyParams, null, 2)};\ncurl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));` : ''}\n\n// Para propósitos de desarrollo, desactiva la verificación SSL\ncurl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);\ncurl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);\n\n$resp = curl_exec($curl);\ncurl_close($curl);\n\n$response = json_decode($resp, true);\nvar_dump($response);\n?>`
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-600">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Cuerpo de la solicitud:</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm">
              {JSON.stringify(requestBody, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Respuesta:</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Autenticación:</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">API Key:</span> Todos los endpoints requieren una API Key en el encabezado <code>X-API-Key</code>
              </p>
              <p className="text-sm text-gray-600">
                {title.includes("/auth/login") || title.includes("/auth/register") || title.includes("/auth/forgot-password") 
                  ? "No requiere token JWT"
                  : "Requiere token JWT en el encabezado Authorization: Bearer {token}"}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Ejemplos de código:</h3>
            <div className="border rounded-md">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 text-sm ${activeCodeTab === "curl" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveCodeTab("curl")}
                >
                  cURL
                </button>
                <button
                  className={`px-4 py-2 text-sm ${activeCodeTab === "javascript" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveCodeTab("javascript")}
                >
                  JavaScript
                </button>
                <button
                  className={`px-4 py-2 text-sm ${activeCodeTab === "php" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveCodeTab("php")}
                >
                  PHP
                </button>
              </div>
              
              <div className="p-4">
                {activeCodeTab === "curl" && (
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    {generateCurlExample()}
                  </pre>
                )}
                
                {activeCodeTab === "javascript" && (
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    {generateJsExample()}
                  </pre>
                )}
                
                {activeCodeTab === "php" && (
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    {generatePhpExample()}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
