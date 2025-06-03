"use client"

import { useCallback, useState, useEffect, useRef } from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"

import { 
  Bold, 
  Italic, 
  Strikethrough,
  Code,
  Underline as UnderlineIcon, 
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon,
  Highlighter,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  CheckSquare,
  Undo,
  Redo,
  ExternalLink,
  Trash2,
  CornerDownLeft,
  Quote
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-md',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Typography,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })
  
  // Actualizar el contenido del editor cuando cambia el valor de entrada
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      console.log("RichTextEditor actualizando contenido:", value);
      editor.commands.setContent(value);
    }
  }, [editor, value])
  
  // Estados para controlar los popovers
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)
  
  // Función para detectar enlaces activos y actualizar el estado
  useEffect(() => {
    if (!editor) return
    
    const updateLinkState = () => {
      const { href } = editor.getAttributes('link')
      if (editor.isActive('link') && !linkUrl) {
        setLinkUrl(href || '')
      }
    }
    
    editor.on('selectionUpdate', updateLinkState)
    return () => {
      editor.off('selectionUpdate', updateLinkState)
    }
  }, [editor, linkUrl])
  
  // Función para agregar un enlace
  const setLink = useCallback(() => {
    if (!editor) return
    
    // Si hay una URL, establecer el enlace
    if (linkUrl) {
      // Obtener el texto seleccionado
      const { from, to } = editor.state.selection
      const text = editor.state.doc.textBetween(from, to)
      
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run()
      
      // Cerrar el popover y limpiar la URL
      setLinkPopoverOpen(false)
      setTimeout(() => setLinkUrl(""), 100)
    } else {
      // Si no hay URL, eliminar el enlace
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()
    }
  }, [editor, linkUrl])
  
  // Función para abrir el enlace en una nueva ventana
  const openLink = useCallback(() => {
    if (!linkUrl) return
    window.open(linkUrl, '_blank')
  }, [linkUrl])
  
  // Función para eliminar el enlace
  const removeLink = useCallback(() => {
    if (!editor) return
    
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()
    
    setLinkUrl('')
    setLinkPopoverOpen(false)
  }, [editor])
  
  // Función para agregar una imagen
  const addImage = useCallback(() => {
    if (!editor || !imageUrl) return
    
    editor
      .chain()
      .focus()
      .setImage({ src: imageUrl })
      .run()
    
    // Cerrar el popover y limpiar la URL
    setImagePopoverOpen(false)
    setTimeout(() => setImageUrl(""), 100)
  }, [editor, imageUrl])
  
  if (!editor) {
    return null
  }
  
  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-2">
        <TooltipProvider>
          {/* Formato de texto básico */}
          <div className="flex gap-1 mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Negrita</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Cursiva</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("underline")}
                  onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Subrayado</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("highlight")}
                  onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                >
                  <Highlighter className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Resaltar</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Encabezados */}
          <div className="flex gap-1 mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Encabezado 1</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 2 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Encabezado 2</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 3 })}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3 className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Encabezado 3</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Alineación */}
          <div className="flex gap-1 mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                >
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Alinear a la izquierda</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                >
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Centrar</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                >
                  <AlignRight className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Alinear a la derecha</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "justify" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
                >
                  <AlignJustify className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Justificar</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Listas */}
          <div className="flex gap-1 mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Lista con viñetas</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Lista numerada</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("taskList")}
                  onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
                >
                  <CheckSquare className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Lista de tareas</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Superíndice y subíndice */}
          <div className="flex gap-1 mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("superscript")}
                  onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
                >
                  <SuperscriptIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Superíndice</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("subscript")}
                  onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
                >
                  <SubscriptIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Subíndice</TooltipContent>
            </Tooltip>
          </div>
          
          {/* Enlace */}
          <div className="flex gap-1 mr-2">
            <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
              <PopoverTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("link")}
                >
                  <LinkIcon className="h-4 w-4" />
                </Toggle>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="link-url">URL del enlace</Label>
                    <div className="flex gap-2">
                      <Input
                        id="link-url"
                        placeholder="https://ejemplo.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setLink();
                          }
                        }}
                      />
                      <Button size="sm" onClick={setLink} disabled={!linkUrl}>
                        <CornerDownLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={openLink} 
                        disabled={!linkUrl}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Abrir enlace
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={removeLink}
                        disabled={!editor.isActive("link")}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Imagen */}
          <div className="flex gap-1 mr-2">
            <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
              <PopoverTrigger asChild>
                <Toggle 
                  size="sm"
                  pressed={editor.isActive("image")}
                >
                  <ImageIcon className="h-4 w-4" />
                </Toggle>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="image-url">URL de la imagen</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image-url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && imageUrl) {
                            e.preventDefault();
                            addImage();
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        onClick={addImage} 
                        disabled={!imageUrl}
                      >
                        <CornerDownLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">Ingresa la URL de una imagen para insertarla en el editor.</p>
                      <p className="text-xs text-muted-foreground">Formatos soportados: JPG, PNG, GIF, SVG, WebP</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Deshacer/Rehacer */}
          <div className="flex gap-1 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Deshacer</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rehacer</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      
      <EditorContent editor={editor} className={`prose prose-sm max-w-none min-h-[200px] focus:outline-none ${className || ''}`} />
    </div>
  )
}
