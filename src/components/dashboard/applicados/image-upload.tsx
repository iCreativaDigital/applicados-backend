"use client"

import { useState, useRef, useEffect } from "react"
import { Trash, Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast } from "sonner"

interface ImageUploadProps {
  currentImageUrl?: string
  onImageChange: (imageUrl: string | null) => void
  label?: string
}

export function ImageUpload({ 
  currentImageUrl, 
  onImageChange,
  label = "Imagen" 
}: ImageUploadProps) {
  // Inicializar el estado con la URL de la imagen actual
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  
  // Actualizar el estado cuando cambia currentImageUrl (por ejemplo, al cargar datos)
  useEffect(() => {
    setPreviewUrl(currentImageUrl || null);
    console.log("ImageUpload recibió URL:", currentImageUrl);
  }, [currentImageUrl])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Manejar la selección de archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error("Error", {
        description: "El archivo seleccionado no es una imagen válida."
      })
      return
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Error", {
        description: "La imagen es demasiado grande. El tamaño máximo es 2MB."
      })
      return
    }

    try {
      setIsUploading(true)

      // Crear FormData para enviar el archivo
      const formData = new FormData()
      formData.append('file', file)

      // Enviar archivo al servidor
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      
      // Actualizar la vista previa y notificar al componente padre
      setPreviewUrl(data.url)
      onImageChange(data.url)
      
      toast.success("Imagen subida", {
        description: "La imagen se ha subido correctamente."
      })
    } catch (error) {
      console.error('Error al subir imagen:', error)
      toast.error("Error", {
        description: "No se pudo subir la imagen. Inténtalo de nuevo."
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Eliminar la imagen actual
  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      
      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <div className="relative h-48 w-full">
            <Image 
              src={previewUrl} 
              alt="Vista previa" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={handleRemoveImage}
              type="button"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">Arrastra una imagen o haz clic para seleccionar</p>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            type="button"
          >
            {isUploading ? "Subiendo..." : "Seleccionar imagen"}
          </Button>
        </div>
      )}
      
      <Input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange}
      />
    </div>
  )
}
