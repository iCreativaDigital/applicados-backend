"use client";

import { useState } from "react";
import { deleteUser, toggleUserStatus } from "@/actions/users";

interface UserItemProps {
  user: any;
  onEdit: () => void;
  onChangePassword: () => void;
  onRefresh: () => Promise<void>;
}

export function UserItem({ user, onEdit, onChangePassword, onRefresh }: UserItemProps) {
  const [deleting, setDeleting] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  
  // Función para eliminar usuario
  const handleDelete = async () => {
    if (!confirm("¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.")) {
      return;
    }
    
    setDeleting(true);
    try {
      const result = await deleteUser(user.id);
      if (result.success) {
        await onRefresh();
      } else {
        alert(result.error || "Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Ocurrió un error al eliminar el usuario");
    } finally {
      setDeleting(false);
    }
  };
  
  // Función para activar/desactivar usuario
  const handleToggleStatus = async () => {
    setToggleStatus(true);
    try {
      const result = await toggleUserStatus(user.id, !user.active);
      if (result.success) {
        await onRefresh();
      } else {
        alert(result.error || "Error al cambiar el estado del usuario");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Ocurrió un error al cambiar el estado del usuario");
    } finally {
      setToggleStatus(false);
    }
  };
  
  return (
    <tr>
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
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-900"
            title="Editar usuario"
          >
            Editar
          </button>
          <button
            onClick={onChangePassword}
            className="text-blue-600 hover:text-blue-900 cursor-pointer"
            title="Cambiar contraseña"
          >
            Contraseña
          </button>
          <button
            onClick={handleToggleStatus}
            disabled={toggleStatus}
            className="text-yellow-600 hover:text-yellow-900 cursor-pointer disabled:opacity-50"
            title={user.active ? "Desactivar usuario" : "Activar usuario"}
          >
            {toggleStatus ? "..." : (user.active ? "Desactivar" : "Activar")}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-900 cursor-pointer disabled:opacity-50"
            title="Eliminar usuario"
          >
            {deleting ? "..." : "Eliminar"}
          </button>
        </div>
      </td>
    </tr>
  );
}
