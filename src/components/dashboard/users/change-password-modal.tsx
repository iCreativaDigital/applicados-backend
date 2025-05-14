"use client";

import { useState } from "react";
import { changeUserPassword } from "@/actions/users";

interface ChangePasswordModalProps {
  user: any;
  onSuccess: () => Promise<void>;
  onClose: () => void;
}

export function ChangePasswordModal({ user, onSuccess, onClose }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar error al editar el campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await changeUserPassword({
        userId: user.id,
        password: formData.password,
      });
      
      if (result.success) {
        // Cerrar modal y refrescar lista
        closeModal();
        await onSuccess();
      } else {
        // Mostrar error del servidor
        setErrors({ server: result.error || "Error al cambiar la contraseña" });
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setErrors({ server: "Ocurrió un error al cambiar la contraseña" });
    } finally {
      setLoading(false);
    }
  };
  
  const closeModal = () => {
    // Resetear formulario
    setFormData({
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    
    // Ocultar modal y notificar al componente padre
    document.getElementById('change-password-modal')?.classList.add('hidden');
    onClose();
  };
  
  return (
    <div id="change-password-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Cambiar Contraseña</h3>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        <p className="mb-4 text-gray-600">
          Cambiando contraseña para: <span className="font-semibold">{user.username}</span>
        </p>
        
        {errors.server && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.server}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nueva contraseña"
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Confirmar contraseña"
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
