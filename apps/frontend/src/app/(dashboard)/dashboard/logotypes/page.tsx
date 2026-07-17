'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Sparkles, Download, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const logoStyles = [
  'Minimalista', 'Moderno', 'Corporativo', 'Abstracto', 'Geométrico',
  'Mascota', 'Monograma', 'Tipográfico', 'Emblema', 'Firma',
];

const industries = [
  'Tecnología', 'Gastronomía', 'Moda', 'Música', 'Salud',
  'Educación', 'Finanzas', 'Deportes', 'Viajes', 'Bienes Raíces',
];

export default function LogosPage() {
  const [brandName, setBrandName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Minimalista');
  const [selectedIndustry, setSelectedIndustry] = useState('Tecnología');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Generador de Logos IA</h1>
        <p className="text-surface-400 mt-1">Crea logos profesionales con inteligencia artificial.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nombre de la marca"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Ej: TechNova"
                />
                <Input
                  label="Eslogan (opcional)"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="Ej: Innovación sin límites"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Industria</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        selectedIndustry === ind
                          ? 'border-white/20 bg-primary-500/20 text-white'
                          : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Estilo</label>
                <div className="flex flex-wrap gap-2">
                  {logoStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        selectedStyle === style
                          ? 'border-white/20 bg-primary-500/20 text-white'
                          : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="gradient" icon={<Sparkles className="w-5 h-5" />}>
                  Generar Logo
                </Button>
                <Button variant="secondary" icon={<RefreshCw className="w-5 h-5" />}>
                  Variaciones
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-800/50 rounded-xl border border-surface-700/50 flex items-center justify-center group cursor-pointer hover:border-primary-500/30 transition-all relative"
                  >
                    <PenTool className="w-10 h-10 text-surface-500" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['SVG', 'PNG', 'PDF'].map((format) => (
                <Button key={format} variant="secondary" fullWidth icon={<Download className="w-4 h-4" />}>
                  {format}
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Colores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {['#6366f1', '#a855f7', '#ef4444', '#22c55e', '#f59e0b', '#06b6d4'].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-lg border-2 border-white/10 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
