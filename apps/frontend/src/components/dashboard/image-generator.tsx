'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Settings2,
  Image as ImageIcon,
  Download,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api, endpoints } from '@/lib/api';

const imageStyles = [
  { label: 'Realista', value: 'realistic' },
  { label: 'Anime', value: 'anime' },
  { label: '3D', value: '3d' },
  { label: 'Pixar', value: 'pixar' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'Cinemático', value: 'cinematic' },
  { label: 'Fotografía', value: 'photography' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Sketch', value: 'sketch' },
  { label: 'Pixel Art', value: 'pixel-art' },
  { label: 'Logo', value: 'logo' },
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [quantity, setQuantity] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [credits, setCredits] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    api.get('/payments/subscription').then((r) => {
      if (r.data.success) setCredits(r.data.data.credits || 0);
    }).catch(() => {});
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const { data } = await api.post(endpoints.images.generate, {
        prompt,
        style: selectedStyle,
        quantity,
      });
      if (data.success && data.data) {
        setResults(data.data);
      }
    } catch (err: any) {
      console.error('Generation failed:', err.response?.data || err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (b64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${b64}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  icon={<Settings2 className="w-4 h-4" />}
                >
                  {showAdvanced ? 'Ocultar' : 'Mostrar'} opciones
                </Button>
              </div>

              {showAdvanced && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4 pt-2">
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
                icon={generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              >
                {generating ? 'Generando...' : 'Generar Imagen'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-12 text-surface-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Las imágenes generadas aparecerán aquí</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((img, i) => (
                    <div
                      key={img.id || i}
                      className="relative aspect-square rounded-xl overflow-hidden border border-surface-700/50 group bg-surface-800/50"
                    >
                      <img
                        src={`data:${img.contentType || 'image/jpeg'};base64,${img.b64_json}`}
                        alt={img.prompt || `Generated ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Download className="w-4 h-4" />}
                          onClick={() => handleDownload(img.b64_json, `ia-studio-${i + 1}.jpg`)}
                        >
                          Descargar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Créditos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-3xl font-bold gradient-text mb-1">{credits}</p>
              <p className="text-sm text-surface-400">créditos disponibles</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
