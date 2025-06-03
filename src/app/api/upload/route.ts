import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { auth } from '@/auth'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Procesar el archivo
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande (máximo 2MB)' },
        { status: 400 }
      )
    }

    // Obtener extensión del archivo
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    
    // Generar nombre único para el archivo
    const fileName = `${uuidv4()}.${fileExtension}`
    
    // Definir la ruta de destino
    const contentDir = join(process.cwd(), 'public', 'content')
    
    // Asegurarse de que el directorio exista
    try {
      await mkdir(contentDir, { recursive: true })
    } catch (error) {
      // Ignorar error si el directorio ya existe
    }
    
    const filePath = join(contentDir, fileName)
    
    // Convertir el archivo a un ArrayBuffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Guardar el archivo
    await writeFile(filePath, buffer)
    
    // Devolver la URL relativa del archivo
    const fileUrl = `/content/${fileName}`
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl 
    })
  } catch (error) {
    console.error('Error al procesar la carga de archivos:', error)
    return NextResponse.json(
      { error: 'Error al procesar la carga de archivos' },
      { status: 500 }
    )
  }
}
