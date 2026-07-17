'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Sparkles, Image, Download, Globe, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const adPlatforms = [
  { name: 'Facebook', icon: 'f', gradient: 'from-blue-500 to-indigo-500' },
  { name: 'Instagram', icon: 'ig', gradient: 'from-purple-500 to-pink-500' },
  { name: 'TikTok', icon: 'tt', gradient: 'from-black to-gray-600' },
  { name: 'Google', icon: 'G', gradient: 'from-blue-400 to-green-400' },
  { name: 'YouTube', icon: 'YT', gradient: 'from-red-500 to-rose-500' },
];

const adFormats = [
  { label: 'Feed Post', desc: 'Publicación en feed' },
  { label: 'Story', desc: 'Historia vertical' },
  { label: 'Banner', desc: 'Banner horizontal' },
  { label: 'Video Ad', desc: 'Anuncio en video' },
  { label: 'Carousel', desc: 'Carrusel de imágenes' },
];

export default function AdsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
  const [selectedFormat, setSelectedFormat] = useState('Feed Post');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Publicidad IA</h1>
        <p className="text-surface-400 mt-1">Genera anuncios optimizados para todas las plataformas.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {adPlatforms.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPlatform(p.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                      selectedPlatform === p.name
                        ? 'border-white/20 bg-primary-500/20 text-white'
                        : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded bg-gradient-to-br ${p.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
                      {p.icon}
                    </div>
                    <span className="text-sm">{p.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crear Anuncio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre del producto/servicio" placeholder="Ej: Curso Online" />
                <Input label="Público objetivo" placeholder="Ej: Emprendedores 25-45" />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Descripción del anuncio</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-900/80 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Describe qué quieres promocionar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Formato</label>
                <div className="flex flex-wrap gap-2">
                  {adFormats.map((fmt) => (
                    <button
                      key={fmt.label}
                      onClick={() => setSelectedFormat(fmt.label)}
                      className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                        selectedFormat === fmt.label
                          ? 'border-white/20 bg-primary-500/20 text-white'
                          : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                      }`}
                    >
                      <span className="block font-medium">{fmt.label}</span>
                      <span className="text-xs text-surface-500">{fmt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="gradient" fullWidth icon={<Sparkles className="w-5 h-5" />}>
                Generar Anuncio
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-surface-800/50 rounded-xl flex items-center justify-center border border-surface-700/50">
                <Megaphone className="w-12 h-12 text-surface-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Copy Generado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-surface-800/50 rounded-xl">
                <p className="text-sm text-surface-300 font-medium">Título</p>
                <p className="text-xs text-surface-500 mt-1">¡Transforma tu negocio hoy!</p>
              </div>
              <div className="p-3 bg-surface-800/50 rounded-xl">
                <p className="text-sm text-surface-300 font-medium">Descripción</p>
                <p className="text-xs text-surface-500 mt-1">Descubre cómo nuestra solución puede ayudarte a alcanzar tus metas.</p>
              </div>
              <div className="p-3 bg-surface-800/50 rounded-xl">
                <p className="text-sm text-surface-300 font-medium">CTA</p>
                <p className="text-xs text-emerald-400 mt-1">Comienza ahora →</p>
              </div>
              <Button variant="secondary" fullWidth size="sm" icon={<RefreshCw className="w-4 h-4" />}>
                Regenerar Copy
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['PNG', 'JPG', 'WEBP', 'MP4'].map((fmt) => (
                <Button key={fmt} variant="secondary" fullWidth size="sm" icon={<Download className="w-4 h-4" />}>
                  {fmt}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
