/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desactivar ESLint durante el build para evitar errores con archivos generados
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
