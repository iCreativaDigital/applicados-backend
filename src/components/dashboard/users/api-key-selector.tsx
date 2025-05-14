"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ApiKey } from "@/generated/prisma/client";

interface ApiKeySelectorProps {
  apiKeys: ApiKey[];
}

export function ApiKeySelector({ apiKeys }: ApiKeySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>(
    searchParams.get("apiKeyId") || ""
  );

  // Cuando cambia la API Key seleccionada, actualizar la URL
  useEffect(() => {
    if (selectedApiKeyId) {
      router.push(`/dashboard/users?apiKeyId=${selectedApiKeyId}`);
    }
  }, [selectedApiKeyId, router]);

  return (
    <div>
      <label htmlFor="apiKeySelect" className="block text-sm font-medium text-gray-700 mb-2">
        API Key
      </label>
      <select
        id="apiKeySelect"
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedApiKeyId}
        onChange={(e) => setSelectedApiKeyId(e.target.value)}
      >
        <option value="">Seleccione una API Key</option>
        {apiKeys.map((apiKey) => (
          <option key={apiKey.id} value={apiKey.id}>
            {apiKey.name} - {apiKey.key.substring(0, 8)}...
          </option>
        ))}
      </select>
    </div>
  );
}
