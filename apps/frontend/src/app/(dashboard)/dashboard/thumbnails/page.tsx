'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Sparkles, Download, Layout, Type, Palette } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const thumbnailTemplates = [
  { name: 'Título + Imagen', preview: 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20' },
  { name: 'Reacción', preview: 'bg-gradient-to-br from-red-500/20 to-rose-500/20' },
  { name: 'Split Screen', preview: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' },
  { name: 'Minimalista', preview: 'bg-gradient-to-br from-slate-500/20 to-zinc-500/20' },
  { name: 'Texto Grande', preview: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' },
  { name: 'Comparación', preview: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' },
];

const platforms = [
  { name: 'YouTube', resolution: '1280×720', color: 'from-red-500 to-rose-500' },
  { name: 'Instagram', resolution: '1080×1080', color: 'from-purple-500 to-pink-500' },
  { name: 'Facebook', resolution: '1200×630', color: 'from-blue-500 to-indigo-500' },
  { name: 'Twitter', resolution: '1200×675', color: 'from-sky-500 to-blue-500' },
];

export default function ThumbnailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('Título + Imagen');
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Miniaturas</h1>
        <p className="text-surface-400 mt-1">Crea miniaturas optimizadas para YouTube y redes sociales.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {thumbnailTemplates.map((tpl) => (
                  <button
                    key={tpl.name}
                    onClick={() => setSelectedTemplate(tpl.name)}
                    className={`aspect-video rounded-xl border p-3 flex items-center justify-center text-center transition-all ${
                      selectedTemplate === tpl.name
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-surface-700/50 hover:border-surface-600'
                    } ${tpl.preview}`}
                  >
                    <span className="text-xs font-medium text-surface-300">{tpl.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Editor de Miniatura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-surface-800/50 rounded-xl flex items-center justify-center border border-surface-700/50">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-surface-500 mx-auto mb-3" />
                  <p className="text-surface-400 text-sm">Vista previa de la miniatura</p>
                  <p className="text-xs text-surface-500 mt-1">Arrastra elementos aquí</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <label className="text-xs text-surface-400 block mb-1">Título principal</label>
                  <Input placeholder="Texto grande" />
                </div>
                <div>
                  <label className="text-xs text-surface-400 block mb-1">Subtítulo</label>
                  <Input placeholder="Texto pequeño" />
                </div>
                <div>
                  <label className="text-xs text-surface-400 block mb-1">Color de texto</label>
                  <div className="flex gap-1">
                    {['#ffffff', '#fbbf24', '#ef4444', '#22c55e', '#3b82f6', '#a855f7'].map((c) => (
                      <button key={c} className="w-7 h-7 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="gradient" size="sm" icon={<Sparkles className="w-4 h-4" />}>
                  Generar con IA
                </Button>
                <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPlatform(p.name)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedPlatform === p.name
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-surface-700/50 hover:border-surface-600'
                  }`}
                >
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${p.color} mb-2`} />
                  <p className="text-sm font-medium text-surface-200">{p.name}</p>
                  <p className="text-xs text-surface-500">{p.resolution}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimización CTR</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">A+</div>
              <p className="text-sm text-surface-400">Puntuación estimada</p>
              <div className="mt-3 space-y-2 text-xs text-surface-500 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  Contraste óptimo
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  Texto legible
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  Mejora el encuadre
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
