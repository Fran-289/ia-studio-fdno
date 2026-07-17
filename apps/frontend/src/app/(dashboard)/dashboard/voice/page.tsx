'use client';

import { motion } from 'framer-motion';
import { Mic2, Play, Download, Globe, Sliders } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function VoicePage() {
  const [text, setText] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Voz IA</h1>
        <p className="text-surface-400 mt-1">Texto a voz, clonación y traducción de audio.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Texto a Voz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Texto</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escribe el texto que quieres convertir a voz..."
                  rows={6}
                  className="w-full px-4 py-3 bg-surface-900/80 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Voz</label>
                  <select className="input-field">
                    <option>Español - México (Femenino)</option>
                    <option>Español - España (Masculino)</option>
                    <option>English - US (Female)</option>
                    <option>English - UK (Male)</option>
                    <option>Português - Brasil (Feminino)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Idioma</label>
                  <select className="input-field">
                    <option>Español</option>
                    <option>English</option>
                    <option>Português</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                    <option>Italiano</option>
                    <option>日本語</option>
                    <option>한국어</option>
                    <option>中文</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Velocidad</label>
                  <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full accent-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Tono</label>
                  <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full accent-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-2">Emoción</label>
                  <select className="input-field">
                    <option>Neutral</option>
                    <option>Feliz</option>
                    <option>Triste</option>
                    <option>Enojado</option>
                    <option>Emocionado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="gradient" icon={<Play className="w-5 h-5" />}>
                  Escuchar
                </Button>
                <Button variant="secondary" icon={<Download className="w-5 h-5" />}>
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clonación de Voz</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <Mic2 className="w-12 h-12 text-surface-500 mx-auto mb-3" />
              <p className="text-surface-400 mb-4">Sube una muestra de voz para clonarla</p>
              <Button variant="secondary" fullWidth>Subir Audio</Button>
              <p className="text-xs text-surface-500 mt-2">Mínimo 30 segundos de audio claro</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traducción</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <select className="input-field">
                  <option>Español → Inglés</option>
                  <option>Inglés → Español</option>
                  <option>Portugués → Español</option>
                </select>
                <Button variant="secondary" fullWidth icon={<Globe className="w-5 h-5" />}>
                  Traducir Audio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
