import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/toast';

export const metadata: Metadata = {
  title: {
    default: 'IA Studio FDNO - Creación y Edición con Inteligencia Artificial',
    template: '%s | IA Studio FDNO',
  },
  description:
    'Plataforma SaaS todo en uno para crear y editar imágenes, videos y audio con Inteligencia Artificial. Herramientas profesionales de edición, generación de contenido y más.',
  keywords: [
    'IA',
    'inteligencia artificial',
    'generador de imágenes',
    'editor de video',
    'clonar voz',
    'crear contenido',
    'diseñar logos',
    'IA Studio FDNO',
  ],
  authors: [{ name: 'IA Studio FDNO' }],
  creator: 'IA Studio FDNO',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'IA Studio FDNO',
    title: 'IA Studio FDNO - Creación y Edición con Inteligencia Artificial',
    description:
      'Plataforma SaaS todo en uno para crear y editar imágenes, videos y audio con Inteligencia Artificial.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA Studio FDNO',
    description:
      'Plataforma SaaS todo en uno para crear y editar imágenes, videos y audio con Inteligencia Artificial.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-surface-950 text-surface-100 antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
