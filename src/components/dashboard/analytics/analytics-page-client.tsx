"use client";

import { useState, useEffect } from "react";
import { CustomChartContainer } from "./chart-container";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Colores para los gráficos
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8",
  "#82CA9D", "#F44336", "#3F51B5", "#4CAF50", "#FFC107"
];

interface AnalyticsPageClientProps {
  systemStatsResult: any;
  eventsByTypeResult: any;
  eventsByDayResult: any;
  activeSessionsResult: any;
  userStatsByApiKeyResult: any;
  authLogsResult: any;
}

export function AnalyticsPageClient({
  systemStatsResult,
  eventsByTypeResult,
  eventsByDayResult,
  activeSessionsResult,
  userStatsByApiKeyResult,
  authLogsResult
}: AnalyticsPageClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Formatear datos para los gráficos si es necesario
  const systemStats = systemStatsResult.success ? systemStatsResult.data : null;
  const eventsByType = eventsByTypeResult.success ? eventsByTypeResult.data : [];
  const eventsByDay = eventsByDayResult.success ? eventsByDayResult.data : [];
  const activeSessions = activeSessionsResult.success ? activeSessionsResult.data : [];
  const userStatsByApiKey = userStatsByApiKeyResult.success ? userStatsByApiKeyResult.data : [];
  const authLogs = authLogsResult.success ? authLogsResult.data : [];
  
  // Ajustar el tamaño de los gráficos cuando el componente se monte
  useEffect(() => {
    // Forzar un reflow para que los gráficos se ajusten correctamente
    const resizeCharts = () => {
      window.dispatchEvent(new Event('resize'));
    };
    
    // Ejecutar después de que el componente se monte
    resizeCharts();
    
    // También ejecutar cuando cambie la pestaña activa
    const timer = setTimeout(resizeCharts, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="space-y-8">
      {/* Tarjetas de estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="API Keys" 
          value={systemStats?.apiKeysCount || 0} 
          description="Total de API Keys activas" 
          icon={<KeyIcon />}
        />
        <StatCard 
          title="Usuarios" 
          value={systemStats?.usersCount || 0} 
          description="Total de usuarios registrados" 
          icon={<UserIcon />}
        />
        <StatCard 
          title="Sesiones Activas" 
          value={systemStats?.activeSessionsCount || 0} 
          description="Sesiones actualmente activas" 
          icon={<SessionIcon />}
        />
        <StatCard 
          title="Eventos" 
          value={systemStats?.authEventsCount || 0} 
          description="Total de eventos de autenticación" 
          icon={<EventIcon />}
        />
      </div>

      {/* Pestañas para diferentes vistas */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="sessions">Sesiones</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        {/* Pestaña de Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de eventos por tipo */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos por Tipo</CardTitle>
                <CardDescription>Distribución de eventos de autenticación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Tipo de Evento</th>
                        <th className="px-6 py-3">Cantidad</th>
                        <th className="px-6 py-3">Porcentaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsByType.length > 0 ? (
                        eventsByType.map((event: any, index: number) => {
                          // Calcular el porcentaje
                          const total = eventsByType.reduce((sum: number, e: any) => sum + e.value, 0);
                          const percentage = total > 0 ? (event.value / total) * 100 : 0;
                          
                          return (
                            <tr key={`event-${index}`} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">
                                <div className="flex items-center">
                                  <span 
                                    className="inline-block w-3 h-3 mr-2 rounded-full" 
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                  />
                                  {formatEventType(event.name)}
                                </div>
                              </td>
                              <td className="px-6 py-4">{event.value}</td>
                              <td className="px-6 py-4">{percentage.toFixed(1)}%</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="bg-white border-b">
                          <td colSpan={3} className="px-6 py-4 text-center">No hay datos disponibles</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de usuarios por API Key */}
            <CustomChartContainer
              title="Usuarios por API Key"
              description="Distribución de usuarios por API Key"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userStatsByApiKey}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CustomChartContainer>
          </div>
        </TabsContent>
        
        {/* Pestaña de Eventos */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Recientes</CardTitle>
                <CardDescription>Eventos de autenticación en los últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Fecha</th>
                        <th className="px-6 py-3">Inicios de sesión</th>
                        <th className="px-6 py-3">Cierres de sesión</th>
                        <th className="px-6 py-3">Registros</th>
                        <th className="px-6 py-3">Reseteos de contraseña</th>
                        <th className="px-6 py-3">Refrescos de token</th>
                        <th className="px-6 py-3">Verificación email</th>
                        <th className="px-6 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsByDay.length > 0 ? (
                        eventsByDay.map((day: any, index: number) => {
                          // Calcular el total de eventos para este día
                          const total = (
                            (day.LOGIN || 0) + 
                            (day.LOGOUT || 0) + 
                            (day.REGISTER || 0) + 
                            (day.PASSWORD_RESET || 0) + 
                            (day.TOKEN_REFRESH || 0) +
                            (day.EMAIL_VERIFICATION || 0) +
                            (day.ACCOUNT_LOCK || 0) +
                            (day.ACCOUNT_UNLOCK || 0)
                          );
                          
                          return (
                            <tr key={`day-${index}`} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">{day.date}</td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#0088FE]" />
                                  {day.LOGIN || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#00C49F]" />
                                  {day.LOGOUT || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#FFBB28]" />
                                  {day.REGISTER || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#FF8042]" />
                                  {day.PASSWORD_RESET || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#8884D8]" />
                                  {day.TOKEN_REFRESH || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center">
                                  <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#82CA9D]" />
                                  {day.EMAIL_VERIFICATION || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-bold">{total}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="bg-white border-b">
                          <td colSpan={8} className="px-6 py-4 text-center">No hay datos disponibles</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Pestaña de Sesiones */}
        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Sesiones actualmente activas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Usuario</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">IP</th>
                      <th className="px-6 py-3">Dispositivo</th>
                      <th className="px-6 py-3">Creada</th>
                      <th className="px-6 py-3">Expira</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSessions.length > 0 ? (
                      activeSessions.map((session: any) => (
                        <tr key={session.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{session.user?.username || "N/A"}</td>
                          <td className="px-6 py-4">{session.user?.email || "N/A"}</td>
                          <td className="px-6 py-4">{session.ip_address || "N/A"}</td>
                          <td className="px-6 py-4">{formatUserAgent(session.user_agent)}</td>
                          <td className="px-6 py-4">{formatDate(session.created_at)}</td>
                          <td className="px-6 py-4">{formatDate(session.expires_at)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b">
                        <td colSpan={6} className="px-6 py-4 text-center">No hay sesiones activas</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pestaña de Usuarios */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Usuarios</CardTitle>
              <CardDescription>Análisis de usuarios por API Key</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userStatsByApiKey}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={90}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} usuarios`, "Cantidad"]}
                      labelFormatter={(name) => `API Key: ${name}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Usuarios" 
                      fill="#8884d8"
                      label={{ position: 'right', formatter: (value: number) => value }}
                    >
                      {userStatsByApiKey.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pestaña de Logs */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Autenticación</CardTitle>
              <CardDescription>Eventos de autenticación de los usuarios creados con tu API Key</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Usuario</th>
                      <th className="px-6 py-3">Tipo de Evento</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">IP</th>
                      <th className="px-6 py-3">Dispositivo</th>
                      <th className="px-6 py-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authLogs.length > 0 ? (
                      authLogs.map((log: any) => (
                        <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{log.user?.username || "N/A"}</td>
                          <td className="px-6 py-4">{formatEventType(log.event_type)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              log.status === "SUCCESS" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {log.status === "SUCCESS" ? "Éxito" : "Fallido"}
                            </span>
                          </td>
                          <td className="px-6 py-4">{log.ip_address || "N/A"}</td>
                          <td className="px-6 py-4">{formatUserAgent(log.user_agent)}</td>
                          <td className="px-6 py-4">{formatDate(log.created_at)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b">
                        <td colSpan={6} className="px-6 py-4 text-center">No hay logs de autenticación</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Estilos adicionales para corregir los gráficos */}
      <style jsx global>{`
        .recharts-wrapper, .recharts-surface {
          width: 100% !important;
          height: 100% !important;
          min-height: 250px;
          overflow: visible;
        }
        .recharts-responsive-container {
          width: 100% !important;
          height: 100% !important;
          min-height: 250px;
        }
      `}</style>
    </div>
  );
}

// Componente para tarjetas de estadísticas
function StatCard({ title, value, description, icon }: { title: string; value: number; description: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Iconos para las tarjetas
function KeyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      <line x1="15" y1="9" x2="9" y2="15"></line>
    </svg>
  );
}

function EventIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
}

// Funciones de utilidad
function formatDate(dateString: string) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

function formatUserAgent(userAgent: string) {
  if (!userAgent) return "N/A";
  // Simplificar el user agent para mostrar solo información relevante
  if (userAgent.includes("Mozilla")) {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
  }
  return "Otro";
}

function formatEventType(eventType: string) {
  const eventTypes: Record<string, string> = {
    "LOGIN": "Inicio de sesión",
    "LOGOUT": "Cierre de sesión",
    "REGISTER": "Registro",
    "PASSWORD_RESET_REQUEST": "Solicitud de reseteo de contraseña",
    "PASSWORD_RESET": "Reseteo de contraseña",
    "EMAIL_VERIFICATION": "Verificación de email",
    "TOKEN_REFRESH": "Refresco de token",
    "ACCOUNT_LOCK": "Bloqueo de cuenta",
    "ACCOUNT_UNLOCK": "Desbloqueo de cuenta"
  };
  
  return eventTypes[eventType] || eventType;
}
