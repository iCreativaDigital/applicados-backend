"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getApiKeyUsers } from "@/actions/users";
import { UserItem } from "./user-item";
import { CreateUserModal } from "./create-user-modal";
import { EditUserModal } from "./edit-user-modal";
import { ChangePasswordModal } from "./change-password-modal";

export function UsersList() {
  const searchParams = useSearchParams();
  const apiKeyId = searchParams.get("apiKeyId");
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [changingPasswordUser, setChangingPasswordUser] = useState<any | null>(null);
  
  // Cargar usuarios cuando cambia la API Key seleccionada
  useEffect(() => {
    async function loadUsers() {
      if (!apiKeyId) {
        setUsers([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await getApiKeyUsers(apiKeyId);
        if (result.success && result.users) {
          setUsers(result.users);
        } else {
          setUsers([]);
          setError(result.error || "Error al cargar los usuarios");
        }
      } catch (err) {
        setError("Error al cargar los usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadUsers();
  }, [apiKeyId]);
  
  // Función para actualizar la lista después de crear/editar/eliminar
  const refreshUsers = async () => {
    if (!apiKeyId) return;
    
    setLoading(true);
    try {
      const result = await getApiKeyUsers(apiKeyId);
      if (result.success && result.users) {
        setUsers(result.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Funciones para manejar acciones de usuario
  const handleEdit = (user: any) => {
    setEditingUser(user);
    document.getElementById('edit-user-modal')?.classList.remove('hidden');
  };
  
  const handleChangePassword = (user: any) => {
    setChangingPasswordUser(user);
    document.getElementById('change-password-modal')?.classList.remove('hidden');
  };
  
  if (!apiKeyId) {
    return (
      <div className="text-center py-10 text-gray-500">
        Por favor, seleccione una API Key para ver sus usuarios.
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">Cargando usuarios...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No hay usuarios para esta API Key. ¡Crea el primero!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <UserItem 
                  key={user.id} 
                  user={user} 
                  onEdit={() => handleEdit(user)}
                  onChangePassword={() => handleChangePassword(user)}
                  onRefresh={refreshUsers}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modales */}
      <CreateUserModal 
        apiKeyId={apiKeyId} 
        onSuccess={refreshUsers} 
      />
      
      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onSuccess={refreshUsers} 
          onClose={() => setEditingUser(null)} 
        />
      )}
      
      {changingPasswordUser && (
        <ChangePasswordModal 
          user={changingPasswordUser} 
          onSuccess={refreshUsers} 
          onClose={() => setChangingPasswordUser(null)} 
        />
      )}
    </div>
  );
}
