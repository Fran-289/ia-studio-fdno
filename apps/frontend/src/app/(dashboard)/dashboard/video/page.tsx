'use client';

import { motion } from 'framer-motion';
import { Video, Upload, Settings2, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function VideoPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('veo');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Generador de Video IA</h1>
        <p className="text-surface-400 mt-1">Crea videos impactantes con inteligencia artificial.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Video</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Modo de creación</label>
                <div className="flex gap-2">
                  {['Texto a Video', 'Imagen a Video', 'Varias Imágenes'].map((mode) => (
                    <button key={mode} className="px-4 py-2 text-sm rounded-xl border border-surface-700/50 text-surface-400 hover:border-white/20 hover:text-white transition-all">
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe el video que quieres crear..."
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-900/80 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Modelo</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'veo', label: 'Veo' },
                    { value: 'runway', label: 'Runway Gen-3' },
                    { value: 'kling', label: 'Kling' },
                    { value: 'luma', label: 'Luma Dream Machine' },
                  ].map((model) => (
                    <button
                      key={model.value}
                      onClick={() => setSelectedModel(model.value)}
                      className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                        selectedModel === model.value
                          ? 'border-white/20 bg-primary-500/20 text-white'
                          : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                      }`}
                    >
                      {model.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Duración (s)</label>
                  <select className="input-field">
                    {[5, 10, 15, 30, 60].map((d) => <option key={d} value={d}>{d}s</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Resolución</label>
                  <select className="input-field">
                    {['720p', '1080p', '4K'].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">FPS</label>
                  <select className="input-field">
                    {[24, 30, 60].map((f) => <option key={f}>{f} FPS</option>)}
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-surface-700/50 rounded-xl p-8 text-center hover:border-primary-500/30 transition-all cursor-pointer">
                <Upload className="w-10 h-10 text-surface-500 mx-auto mb-3" />
                <p className="text-surface-400 font-medium">Arrastra una imagen o haz clic</p>
                <p className="text-sm text-surface-500 mt-1">PNG, JPG, WEBP hasta 50MB</p>
              </div>

              <Button variant="gradient" fullWidth size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Generar Video
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Estilo</label>
                <select className="input-field">
                  {['Realista', 'Cinemático', 'Animado', 'Cyberpunk', 'Fantasy'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Movimiento</label>
                <input type="range" min="0" max="10" className="w-full accent-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Semilla</label>
                <Input type="number" placeholder="Aleatorio" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-surface-800/50 rounded-xl flex items-center justify-center">
                <Video className="w-12 h-12 text-surface-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
