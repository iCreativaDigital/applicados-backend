import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AnalyticsPageClient } from "@/components/dashboard/analytics/analytics-page-client";
import {
  getSystemStats,
  getAuthEventsByType,
  getAuthEventsByDay,
  getActiveSessions,
  getUserStatsByApiKey,
  getAuthLogs
} from "@/actions/analytics";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function AnalyticsPage() {
  // Obtener estadísticas del sistema
  const systemStatsResult = await getSystemStats();
  
  // Obtener datos para el gráfico de eventos por tipo
  const eventsByTypeResult = await getAuthEventsByType();
  
  // Obtener datos para el gráfico de eventos por día
  const eventsByDayResult = await getAuthEventsByDay();
  
  // Obtener sesiones activas
  const activeSessionsResult = await getActiveSessions();
  
  // Obtener estadísticas de usuarios por API Key
  const userStatsByApiKeyResult = await getUserStatsByApiKey();
  
  // Obtener logs de autenticación
  const authLogsResult = await getAuthLogs();
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">Analíticas del Sistema</h1>
      
      <AnalyticsPageClient 
        systemStatsResult={systemStatsResult}
        eventsByTypeResult={eventsByTypeResult}
        eventsByDayResult={eventsByDayResult}
        activeSessionsResult={activeSessionsResult}
        userStatsByApiKeyResult={userStatsByApiKeyResult}
        authLogsResult={authLogsResult}
      />
    </div>
  );
}
