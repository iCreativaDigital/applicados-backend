"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getApiKeyUsers, createUser, updateUser, changeUserPassword, deleteUser, toggleUserStatus } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UsersPageClientProps {
  apiKeysResult: {
    success: boolean;
    apiKeys?: any[];
    error?: string;
  };
}

export function UsersPageClient({ apiKeysResult }: UsersPageClientProps) {
  const searchParams = useSearchParams();
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>(
    searchParams.get("apiKeyId") || ""
  );
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [changingPasswordUser, setChangingPasswordUser] = useState<any | null>(null);

  // Cargar usuarios cuando cambia la API Key seleccionada
  useEffect(() => {
    async function loadUsers() {
      if (!selectedApiKeyId) {
        setUsers([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await getApiKeyUsers(selectedApiKeyId);
        if (result.success) {
          setUsers(result.users || []);
        } else {
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
  }, [selectedApiKeyId]);

  const handleApiKeyChange = (apiKeyId: string) => {
    setSelectedApiKeyId(apiKeyId);
  };

  const handleCreateUserClick = () => {
    document.getElementById('create-user-modal')?.classList.remove('hidden');
  };

  const refreshUsers = async () => {
    if (!selectedApiKeyId) return;
    
    setLoading(true);
    try {
      const result = await getApiKeyUsers(selectedApiKeyId);
      if (result.success) {
        setUsers(result.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Seleccione una API Key</h2>
          <p className="text-gray-600 mb-4">
            Los usuarios se muestran según la API Key seleccionada. Cada API Key representa un cliente diferente.
          </p>
          
          {apiKeysResult.success && apiKeysResult.apiKeys ? (
            <div>
              <label htmlFor="apiKeySelect" className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <select
                id="apiKeySelect"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedApiKeyId}
                onChange={(e) => handleApiKeyChange(e.target.value)}
              >
                <option value="">Seleccione una API Key</option>
                {apiKeysResult.apiKeys.map((apiKey) => (
                  <option key={apiKey.id} value={apiKey.id}>
                    {apiKey.name} - {apiKey.key.substring(0, 8)}...
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-red-500">{apiKeysResult.error || "Error al cargar las API Keys"}</p>
          )}
        </div>
      </div>
      
      <div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            {selectedApiKeyId && (
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={handleCreateUserClick}
              >
                Crear Usuario
              </button>
            )}
          </div>
          
          {!selectedApiKeyId ? (
            <div className="text-center py-10 text-gray-500">
              Por favor, seleccione una API Key para ver sus usuarios.
            </div>
          ) : loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Cargando usuarios...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              {error}
            </div>
          ) : users.length === 0 ? (
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
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name || "Sin nombre"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingUser(user);
                                  // Usar setTimeout para asegurar que el estado se actualice antes de mostrar el modal
                                  setTimeout(() => {
                                    const modal = document.getElementById('edit-user-modal');
                                    if (modal) modal.classList.remove('hidden');
                                  }, 0);
                                }}
                                className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Editar usuario</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setChangingPasswordUser(user);
                                  // Usar setTimeout para asegurar que el estado se actualice antes de mostrar el modal
                                  setTimeout(() => {
                                    const modal = document.getElementById('change-password-modal');
                                    if (modal) modal.classList.remove('hidden');
                                  }, 0);
                                }}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Cambiar contraseña</TooltipContent>
                          </Tooltip>
                          
                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className={`${user.active ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border-yellow-200' : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200'}`}
                                  >
                                    {user.active ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>{user.active ? "Desactivar usuario" : "Activar usuario"}</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{user.active ? "Desactivar usuario" : "Activar usuario"}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {user.active 
                                    ? `¿Está seguro que desea desactivar al usuario ${user.username}?` 
                                    : `¿Está seguro que desea activar al usuario ${user.username}?`}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    try {
                                      const result = await toggleUserStatus(user.id, !user.active);
                                      if (result.success) {
                                        refreshUsers();
                                      } else {
                                        alert(result.error || "Error al cambiar el estado del usuario");
                                      }
                                    } catch (error) {
                                      console.error("Error al cambiar estado:", error);
                                      alert("Ocurrió un error al cambiar el estado del usuario");
                                    }
                                  }}
                                >
                                  {user.active ? "Desactivar" : "Activar"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          
                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>Eliminar usuario</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
                                <AlertDialogDescription>
                                  ¿Está seguro que desea eliminar al usuario <span className="font-semibold">{user.username}</span>? Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                  onClick={async () => {
                                    try {
                                      const result = await deleteUser(user.id);
                                      if (result.success) {
                                        refreshUsers();
                                      } else {
                                        alert(result.error || "Error al eliminar el usuario");
                                      }
                                    } catch (error) {
                                      console.error("Error al eliminar usuario:", error);
                                      alert("Ocurrió un error al eliminar el usuario");
                                    }
                                  }}
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear usuarios */}
      <div id="create-user-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Crear Nuevo Usuario</h3>
            <button 
              onClick={() => document.getElementById('create-user-modal')?.classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const userData = {
              api_key_id: selectedApiKeyId,
              username: formData.get('username') as string,
              email: formData.get('email') as string,
              password: formData.get('password') as string,
              name: formData.get('name') as string || undefined
            };
            
            try {
              const result = await createUser(userData);
              if (result.success) {
                document.getElementById('create-user-modal')?.classList.add('hidden');
                refreshUsers();
              } else {
                alert(result.error || "Error al crear el usuario");
              }
            } catch (error) {
              console.error("Error al crear usuario:", error);
              alert("Ocurrió un error al crear el usuario");
            }
          }}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre completo"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contraseña"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => document.getElementById('create-user-modal')?.classList.add('hidden')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para editar usuarios */}
      {editingUser && (
        <div id="edit-user-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Editar Usuario</h3>
              <button 
                onClick={() => {
                  document.getElementById('edit-user-modal')?.classList.add('hidden');
                  setEditingUser(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const userData = {
                id: editingUser.id,
                username: formData.get('username') as string,
                email: formData.get('email') as string,
                name: formData.get('name') as string || undefined,
                active: formData.get('active') === 'on'
              };
              
              try {
                const result = await updateUser(userData);
                if (result.success) {
                  document.getElementById('edit-user-modal')?.classList.add('hidden');
                  setEditingUser(null);
                  refreshUsers();
                } else {
                  alert(result.error || "Error al actualizar el usuario");
                }
              } catch (error) {
                console.error("Error al actualizar usuario:", error);
                alert("Ocurrió un error al actualizar el usuario");
              }
            }}>
              <div className="mb-4">
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  defaultValue={editingUser.name || ''}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre completo"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="edit-username" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario *
                </label>
                <input
                  type="text"
                  id="edit-username"
                  name="username"
                  defaultValue={editingUser.username}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  defaultValue={editingUser.email}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={editingUser.active}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Usuario activo</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('edit-user-modal')?.classList.add('hidden');
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para cambiar contraseña */}
      {changingPasswordUser && (
        <div id="change-password-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Cambiar Contraseña</h3>
              <button 
                onClick={() => {
                  document.getElementById('change-password-modal')?.classList.add('hidden');
                  setChangingPasswordUser(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <p className="mb-4 text-gray-600">
              Cambiando contraseña para: <span className="font-semibold">{changingPasswordUser.username}</span>
            </p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const password = formData.get('password') as string;
              const confirmPassword = formData.get('confirmPassword') as string;
              
              if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
              }
              
              try {
                const result = await changeUserPassword({
                  userId: changingPasswordUser.id,
                  password: password
                });
                
                if (result.success) {
                  document.getElementById('change-password-modal')?.classList.add('hidden');
                  setChangingPasswordUser(null);
                  alert("Contraseña actualizada correctamente");
                } else {
                  alert(result.error || "Error al cambiar la contraseña");
                }
              } catch (error) {
                console.error("Error al cambiar contraseña:", error);
                alert("Ocurrió un error al cambiar la contraseña");
              }
            }}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nueva contraseña"
                  required
                  minLength={8}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirmar contraseña"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('change-password-modal')?.classList.add('hidden');
                    setChangingPasswordUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
