// lib/prisma.ts
import { PrismaClient } from '../generated/prisma'

// PrismaClient es adjuntado al objeto global en desarrollo para prevenir
// múltiples instancias del cliente Prisma en desarrollo
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Exporta un único cliente Prisma para toda la aplicación
export const prisma =  new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
