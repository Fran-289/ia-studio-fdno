'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const avatarTypes = [
  { label: 'Profesional', icon: '👔', desc: 'Foto corporativa' },
  { label: 'Gamer', icon: '🎮', desc: 'Estilo gaming' },
  { label: 'Corporativo', icon: '🏢', desc: 'Marca empresa' },
  { label: 'Anime', icon: '🎌', desc: 'Estilo japonés' },
  { label: 'Realista', icon: '📸', desc: 'Foto realista' },
  { label: 'Cartoon', icon: '🎨', desc: 'Dibujo animado' },
  { label: 'Cyberpunk', icon: '🤖', desc: 'Futurista' },
  { label: 'Fantasy', icon: '🧙', desc: 'Personaje fantástico' },
];

export default function AvatarsPage() {
  const [selectedType, setSelectedType] = useState('Profesional');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-surface-100">Avatares IA</h1>
        <p className="text-surface-400 mt-1">Crea avatares únicos con inteligencia artificial.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {avatarTypes.map((type) => (
                  <button
                    key={type.label}
                    onClick={() => setSelectedType(type.label)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      selectedType === type.label
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-surface-700/50 hover:border-surface-600 bg-surface-800/30'
                    }`}
                  >
                    <span className="text-3xl block mb-2">{type.icon}</span>
                    <p className="text-sm font-medium text-surface-200">{type.label}</p>
                    <p className="text-xs text-surface-500 mt-0.5">{type.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatares Generados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-800/50 rounded-xl border border-surface-700/50 flex items-center justify-center group cursor-pointer hover:border-primary-500/30 transition-all relative"
                  >
                    <Users className="w-10 h-10 text-surface-500" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
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
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Género</label>
                <select className="input-field">
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Neutro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Edad</label>
                <select className="input-field">
                  <option>Joven (18-25)</option>
                  <option>Adulto (26-40)</option>
                  <option>Maduro (41-60)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Estilo de pelo</label>
                <select className="input-field">
                  <option>Corto</option>
                  <option>Largo</option>
                  <option>Calvo</option>
                  <option>Rizado</option>
                </select>
              </div>
              <Button variant="gradient" fullWidth icon={<Sparkles className="w-5 h-5" />}>
                Generar Avatar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exportar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['PNG', 'JPG', 'WEBP'].map((fmt) => (
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
