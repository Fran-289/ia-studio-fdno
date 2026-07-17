'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const footerLinks = {
  Producto: [
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Casos de Uso', href: '#use-cases' },
    { label: 'API', href: '#' },
  ],
  Recursos: [
    { label: 'Documentación', href: '#' },
    { label: 'Tutoriales', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Comunidad', href: '#' },
  ],
  Empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Prensa', href: '#' },
  ],
  Legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-lg">IA Studio FDNO</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              La plataforma todo en uno para crear y editar contenido con Inteligencia Artificial.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-medium text-surface-200 mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-400 hover:text-surface-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} IA Studio FDNO. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'LinkedIn', 'YouTube'].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-sm text-surface-400 hover:text-surface-200 transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
