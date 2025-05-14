"use client";

import { 
  KeyIcon, 
  UserIcon, 
  WindowIcon, 
  BellIcon 
} from "@heroicons/react/24/outline";

interface StatCardsProps {
  systemStats: {
    apiKeysCount: number;
    usersCount: number;
    activeSessionsCount: number;
    authEventsCount: number;
  } | undefined;
}

export function StatCards({ systemStats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="API Keys" 
        value={systemStats?.apiKeysCount || 0} 
        description="Total de API Keys activas" 
        icon={<KeyIcon className="h-4 w-4" />}
      />
      <StatCard 
        title="Usuarios" 
        value={systemStats?.usersCount || 0} 
        description="Total de usuarios registrados" 
        icon={<UserIcon className="h-4 w-4" />}
      />
      <StatCard 
        title="Sesiones Activas" 
        value={systemStats?.activeSessionsCount || 0} 
        description="Sesiones actualmente activas" 
        icon={<WindowIcon className="h-4 w-4" />}
      />
      <StatCard 
        title="Eventos" 
        value={systemStats?.authEventsCount || 0} 
        description="Total de eventos de autenticación" 
        icon={<BellIcon className="h-4 w-4" />}
      />
    </div>
  );
}

// Componente para tarjetas de estadísticas
function StatCard({ title, value, description, icon }: { title: string; value: number; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <div className="h-4 w-4 text-gray-500">{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
