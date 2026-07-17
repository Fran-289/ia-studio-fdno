'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, Image, Video, Download, Globe, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const socialPlatforms = [
  { name: 'Instagram', icon: 'ig', gradient: 'from-purple-500 to-pink-500', color: '#E4405F' },
  { name: 'TikTok', icon: 'tt', gradient: 'from-black to-gray-600', color: '#000000' },
  { name: 'Facebook', icon: 'f', gradient: 'from-blue-500 to-indigo-500', color: '#1877F2' },
  { name: 'YouTube', icon: 'YT', gradient: 'from-red-500 to-rose-500', color: '#FF0000' },
  { name: 'LinkedIn', icon: 'in', gradient: 'from-blue-600 to-blue-400', color: '#0A66C2' },
  { name: 'Pinterest', icon: 'P', gradient: 'from-red-500 to-orange-500', color: '#E60023' },
  { name: 'X', icon: 'X', gradient: 'from-gray-700 to-gray-500', color: '#000000' },
];

const contentTypes = [
  { label: 'Post', icon: <Image className="w-5 h-5" /> },
  { label: 'Video', icon: <Video className="w-5 h-5" /> },
  { label: 'Story', icon: <Image className="w-5 h-5" /> },
  { label: 'Reel', icon: <Video className="w-5 h-5" /> },
  { label: 'Carrusel', icon: <Image className="w-5 h-5" /> },
];

export default function SocialPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
  const [contentType, setContentType] = useState('Post');

  const togglePlatform = (name: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Redes Sociales</h1>
        <p className="text-surface-400 mt-1">Crea contenido optimizado para todas tus redes sociales.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plataformas</CardTitle>
              <span className="text-xs text-surface-500">{selectedPlatforms.length} seleccionadas</span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {socialPlatforms.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => togglePlatform(p.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                      selectedPlatforms.includes(p.name)
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
              <CardTitle>Crear Contenido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Tipo de contenido</label>
                <div className="flex gap-2">
                  {contentTypes.map((ct) => (
                    <button
                      key={ct.label}
                      onClick={() => setContentType(ct.label)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                        contentType === ct.label
                          ? 'border-white/20 bg-primary-500/20 text-white'
                          : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                      }`}
                    >
                      {ct.icon}
                      <span className="text-sm">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Texto del contenido</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-900/80 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Escribe el texto o idea para tu contenido..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Hashtags" placeholder="#IA #Tecnología" />
                <Input label="CTA" placeholder="Link o llamado a acción" />
              </div>

              <div className="border-2 border-dashed border-surface-700/50 rounded-xl p-6 text-center hover:border-primary-500/30 transition-all cursor-pointer">
                <Image className="w-8 h-8 text-surface-500 mx-auto mb-2" />
                <p className="text-sm text-surface-400">Arrastra imágenes o video</p>
                <p className="text-xs text-surface-500 mt-1">O haz clic para seleccionar archivos</p>
              </div>

              <Button variant="gradient" fullWidth icon={<Sparkles className="w-5 h-5" />}>
                Generar Contenido
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Calendar className="w-10 h-10 text-surface-500 mx-auto mb-2" />
              <p className="text-sm text-surface-400">Programa tus publicaciones</p>
              <Button variant="secondary" fullWidth size="sm" className="mt-3">
                Agendar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between text-surface-400">
                <span>Plataformas</span>
                <span className="text-surface-200">{selectedPlatforms.length}</span>
              </div>
              <div className="flex justify-between text-surface-400">
                <span>Formato</span>
                <span className="text-surface-200">{contentType}</span>
              </div>
              <div className="flex justify-between text-surface-400">
                <span>Tamaño estimado</span>
                <span className="text-surface-200">2.4 MB</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-surface-400">
                <span>Créditos</span>
                <span className="gradient-text font-medium">30</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" fullWidth size="sm" icon={<Download className="w-4 h-4" />}>
                Descargar Todo
              </Button>
              <Button variant="ghost" fullWidth size="sm" icon={<Share2 className="w-4 h-4" />}>
                Compartir
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
