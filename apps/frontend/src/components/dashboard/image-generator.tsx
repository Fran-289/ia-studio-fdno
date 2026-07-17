'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Settings2,
  Image as ImageIcon,
  Download,
  RefreshCw,
  ChevronDown,
  Sliders,
  Wand2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const imageStyles = [
  { label: 'Realista', value: 'realistic' },
  { label: 'Anime', value: 'anime' },
  { label: '3D', value: '3d' },
  { label: 'Pixar', value: 'pixar' },
  { label: 'Disney', value: 'disney' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Cinemático', value: 'cinematic' },
  { label: 'Fotografía', value: 'photography' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Manga', value: 'manga' },
  { label: 'Sketch', value: 'sketch' },
  { label: 'Oil Painting', value: 'oil-painting' },
  { label: 'Watercolor', value: 'watercolor' },
  { label: 'Low Poly', value: 'low-poly' },
  { label: 'Pixel Art', value: 'pixel-art' },
  { label: 'Logo', value: 'logo' },
  { label: 'Sticker', value: 'sticker' },
  { label: 'Tattoo', value: 'tattoo' },
  { label: 'Avatar', value: 'avatar' },
];

const aspectRatios = [
  { label: '1:1', value: '1:1' },
  { label: '16:9', value: '16:9' },
  { label: '9:16', value: '9:16' },
  { label: '4:3', value: '4:3' },
  { label: '3:2', value: '3:2' },
  { label: '2:1', value: '2:1' },
];

const models = [
  { label: 'OpenAI DALL-E 3', value: 'dalle-3' },
  { label: 'FLUX Pro', value: 'flux-pro' },
  { label: 'FLUX Schnell', value: 'flux-schnell' },
  { label: 'Stable Diffusion 3', value: 'sd-3' },
  { label: 'Stable Diffusion XL', value: 'sdxl' },
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [selectedModel, setSelectedModel] = useState('dalle-3');
  const [creativity, setCreativity] = useState(0.7);
  const [quantity, setQuantity] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Generar Imagen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe la imagen que quieres crear..."
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-900/80 border border-surface-700/50 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Prompt Negativo</label>
                <input
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Elementos que NO quieres en la imagen..."
                  className="input-field"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  icon={<Settings2 className="w-4 h-4" />}
                >
                  {showAdvanced ? 'Ocultar' : 'Mostrar'} configuraciones avanzadas
                </Button>
              </div>

              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-4 pt-2"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-300 mb-2">Modelo</label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="input-field"
                      >
                        {models.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-300 mb-2">Relación de Aspecto</label>
                      <div className="flex flex-wrap gap-2">
                        {aspectRatios.map((ratio) => (
                          <button
                            key={ratio.value}
                            onClick={() => setSelectedRatio(ratio.value)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                              selectedRatio === ratio.value
                                ? 'border-white/20 bg-primary-500/20 text-white'
                                : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                            }`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-2">
                      Creatividad: {Math.round(creativity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={creativity}
                      onChange={(e) => setCreativity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-surface-500 mt-1">
                      <span>Precisa</span>
                      <span>Creativa</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-2">Cantidad</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => setQuantity(n)}
                          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                            quantity === n
                              ? 'border-white/20 bg-primary-500/20 text-white'
                              : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <Button
                variant="gradient"
                fullWidth
                size="lg"
                onClick={handleGenerate}
                loading={generating}
                disabled={!prompt.trim()}
                icon={<Sparkles className="w-5 h-5" />}
              >
                {generating ? 'Generando...' : 'Generar Imagen'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-800/50 rounded-xl border border-surface-700/50 flex items-center justify-center group cursor-pointer hover:border-primary-500/30 transition-all"
                  >
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 text-surface-500 mx-auto mb-2" />
                      <p className="text-sm text-surface-400">Imagen {i + 1}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                      <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Estilos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {imageStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setSelectedStyle(style.value)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      selectedStyle === style.value
                        ? 'border-white/20 bg-primary-500/20 text-white'
                        : 'border-surface-700/50 text-surface-400 hover:border-surface-600'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Créditos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold gradient-text mb-1">450</p>
              <p className="text-sm text-surface-400">créditos disponibles</p>
              <div className="mt-4 h-2 bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 gradient-primary rounded-full" />
              </div>
              <p className="text-xs text-surface-500 mt-2">50 créditos = 1 generación</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
