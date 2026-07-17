'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scissors,
  Split,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  Timer,
  RotateCcw,
  StepBack,
  StepForward,
  Film,
  Music,
  Subtitles,
  Mic2,
  Wand2,
  Download,
  Play,
  Square,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const timelineTools = [
  { icon: <Scissors className="w-4 h-4" />, label: 'Cortar' },
  { icon: <Split className="w-4 h-4" />, label: 'Dividir' },
  { icon: <Copy className="w-4 h-4" />, label: 'Duplicar' },
  { icon: <Trash2 className="w-4 h-4" />, label: 'Eliminar' },
  { icon: <ZoomIn className="w-4 h-4" />, label: 'Zoom' },
  { icon: <Timer className="w-4 h-4" />, label: 'Velocidad' },
  { icon: <RotateCcw className="w-4 h-4" />, label: 'Reverse' },
];

const sidebarTools = [
  { icon: <Film className="w-5 h-5" />, label: 'Recortar', group: 'Edición' },
  { icon: <Scissors className="w-5 h-5" />, label: 'Dividir', group: 'Edición' },
  { icon: <Split className="w-5 h-5" />, label: 'Unir', group: 'Edición' },
  { icon: <Volume2 className="w-5 h-5" />, label: 'Audio', group: 'Audio' },
  { icon: <Music className="w-5 h-5" />, label: 'Música', group: 'Audio' },
  { icon: <Subtitles className="w-5 h-5" />, label: 'Subtítulos', group: 'Texto' },
  { icon: <Mic2 className="w-5 h-5" />, label: 'Voz IA', group: 'IA' },
  { icon: <Wand2 className="w-5 h-5" />, label: 'Traducir', group: 'IA' },
];

export function VideoEditor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-16 space-y-1 py-1">
          {sidebarTools.map((tool) => (
            <button
              key={tool.label}
              onClick={() => setActiveTool(tool.label)}
              className={`w-full p-3 rounded-xl transition-all ${
                activeTool === tool.label
                  ? 'gradient-primary text-white'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
              }`}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        <div className="flex-1 glass rounded-2xl flex items-center justify-center relative">
          <div className="text-center">
            <Film className="w-20 h-20 text-surface-500 mx-auto mb-4" />
            <p className="text-surface-400 text-lg mb-2">Editor de Video</p>
            <p className="text-surface-500 text-sm">Arrastra un video o selecciona un proyecto</p>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass rounded-xl px-4 py-2">
            <StepBack className="w-4 h-4 text-surface-400 cursor-pointer hover:text-surface-200" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center"
            >
              {isPlaying ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>
            <StepForward className="w-4 h-4 text-surface-400 cursor-pointer hover:text-surface-200" />
            <div className="w-32 h-1 bg-surface-700 rounded-full mx-2">
              <div className="w-1/3 h-full bg-primary-500 rounded-full" />
            </div>
            <span className="text-xs text-surface-400">00:12 / 01:30</span>
          </div>
        </div>

        <div className="w-72 space-y-3">
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-medium text-surface-200 mb-3">Propiedades</h3>
            {activeTool ? (
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-surface-400 block mb-1">Inicio</label>
                  <input type="text" className="input-field text-sm" value="00:00" />
                </div>
                <div>
                  <label className="text-surface-400 block mb-1">Fin</label>
                  <input type="text" className="input-field text-sm" value="01:30" />
                </div>
                <Button variant="secondary" fullWidth size="sm">Aplicar</Button>
              </div>
            ) : (
              <p className="text-surface-500 text-sm">Selecciona una herramienta</p>
            )}
          </div>

          <div className="glass rounded-2xl p-4 space-y-3">
            <Button variant="gradient" fullWidth size="sm" icon={<Download className="w-4 h-4" />}>
              Exportar
            </Button>
            <div className="text-xs text-surface-500 text-center">
              MP4 · MOV · AVI · WEBM
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          {timelineTools.map((tool) => (
            <button
              key={tool.label}
              className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-white/5 transition-all"
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-surface-500">
            <span>00:00</span>
            <div className="w-64 h-1 bg-surface-700 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-2/5 bg-primary-500 rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-2/5 w-3 h-3 bg-primary-400 rounded-full border-2 border-surface-900 cursor-pointer" />
            </div>
            <span>01:30</span>
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((track) => (
            <div key={track} className="flex-1 h-12 bg-surface-800/50 rounded-lg border border-surface-700/50 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-surface-700/50 flex items-center justify-center text-xs text-surface-500">
                V{track}
              </div>
              {track === 1 && (
                <div className="absolute left-10 top-1 bottom-1 w-24 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded border border-primary-500/20" />
              )}
              {track === 2 && (
                <div className="absolute left-20 top-1 bottom-1 w-32 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded border border-emerald-500/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
